// load environment variable
// from .env file
require('dotenv').config();

// start a new app
var app = require('./app')

// load our fraud prevention module
var FraudDetection = require('./FraudDetection');
var fraudDetection = new FraudDetection();

// handle all routes
require('./routes')(app, fraudDetection);
