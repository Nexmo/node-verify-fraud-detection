"use strict";

require('dotenv').config();

var config = {
  NEXMO_API_KEY: process.env['NEXMO_API_KEY'],
  NEXMO_API_SECRET: process.env['NEXMO_API_SECRET'],
  IP: process.env['IP']
};

module.exports = config;
