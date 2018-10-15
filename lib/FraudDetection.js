var Nexmo = require('nexmo');
var maxmind = require('maxmind');

var FraudDetection = function (config) {
    this.nexmo = new Nexmo({
        apiKey: process.env.NEXMO_API_KEY,
        apiSecret: process.env.NEXMO_API_SECRET
    });

    maxmind.open(__dirname + '/../GeoLite2-Country.mmdb', (err, countryLookup) => {
        this.countryLookup = countryLookup;
    });
};

/**
 * Determines if a number is potentially fraudulent
 * by comparing the number's country status to
 * the IP location
 */
FraudDetection.prototype.matchesLocation = function (number, request, callback) {
    var ip = process.env['IP'] || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    var geoData = this.countryLookup.get(ip);

    this.nexmo.numberInsight.get({
        level: 'advancedSync',
        number: number
    }, function (error, insight) {
        var isRoaming = insight.roaming.status !== 'not_roaming';

        if (isRoaming) {
            var matches = insight.roaming.roaming_country_code == geoData.country.iso_code;
        } else {
            var matches = insight.country_code == geoData.country.iso_code;

        }
        callback(matches)
    });
}

/**
 * Attempts to verify a number, using the Verify API
 */
FraudDetection.prototype.startVerification = function (number, callback) {
    this.nexmo.verify.request({
        number: number,
        brand: 'ACME Corp'
    }, callback);
};

/**
 * Checks if the number submitted by a user to the 
 * Verify API is correct
 */
FraudDetection.prototype.checkVerification = function(request_id, code, callback) {
    this.nexmo.verify.check({
      code: code,
      request_id: request_id
    }, callback);
};

module.exports = FraudDetection;