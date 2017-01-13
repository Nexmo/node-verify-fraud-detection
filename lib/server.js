// start a new app
var app = require('./app')

// load the config from the .env file
var config = require('./config');

// load our fraud prevention module
var FraudDetection = require('./FraudDetection');
var fraudDetection = new FraudDetection(config);

// handle all routes
require('./routes')(app, fraudDetection);

// app.post('/inbound-sms', function(req, res) {
//   var from = req.body.msisdn;
//   var to = req.body.to;
//   var text = req.body.text;
//
//   smsProxy.proxySms(from, to, text);
//
//   res.sendStatus(200);
// });

// // Useful functions for testing out the functionality and querying bookings
// app.post('/conversation', function(req, res) {
//   var userANumber = req.body.userANumber;
//   var userBNumber = req.body.userBNumber;
//
//   smsProxy.createConversation(userANumber, userBNumber, function(err, result) {
//     if(err) {
//       res.status(500).json(err);
//     }
//     else {
//       res.json(result);
//     }
//   });
//
// });
//
// app.get('/', function(req, res) {
//   res.send('Hello World!');
// });
//
// app.get('/provision', function(req, res) {
//   smsProxy.provisionLVNs();
//
//   res.sendStatus(200);
// });
//
// app.get('/configure-numbers', function(req, res) {
//   smsProxy.reconfigureNumbers();
//
//   res.sendStatus(200);
// });
//
// app.get('/provisioned', function(req, res) {
//   res.json(smsProxy.provisionedNumbers);
// });
//
// app.get('/conversations', function(req, res) {
//   res.json(smsProxy.conversations);
// });
