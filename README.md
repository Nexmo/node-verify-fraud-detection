# Fraud Detection using Node and the Nexmo Verify and Number Insight APIs

This app used the Nexmo Number Insight and Verify APIs to demonstrate how to detect and prevent fraudulent phone numbers by comparing the IP of the request to the country of the number's current location.

## Prerequisites

You will need:

* A [free Nexmo account](https://dashboard.nexmo.com/sign-up)

## Installation

```sh
git clone https://github.com/nexmo/node-verify-fraud-detection.git
cd node-verify-fraud-detection
npm install
```

## Setup

Rename the config file:

```sh
mv .env.example .env
```

Fill in the values in `.env` as appropriate.

We have provided an `IP` environment variable so you can emulate a different location that the request comes from.

### Running the App

```sh
npm start
```

The application should be available on <http://localhost:5000>.

### Using the App

Register a number with the application in international format. For example for a UK number: `44555444333`

If your IP is in the same country (or simulated to be) as your number, your number should be accepted directly. If it is not, it will be sent an SMS code to confirm that you indeed own this phone number.

To simulate a different location change the IP in the `.env` file to an IP in a different location and restart the server.

## License

This product includes GeoLite2 data created by MaxMind, available from
[http://www.maxmind.com](http://www.maxmind.com).
