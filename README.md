# iOS App Appium Sauce Labs break point tool

Do you know Sauce Labs has a `hidden` feature that allows you to have
full control over simulator/emulator and do
manual mobile appliation testing?

However, to do this, it requires quite a hack.

This tool helps you to quickly bypass all the hack and all you need to
do is to go to your Sauce Labs dashboard and wait for the full control
over the simulator/emulator.

## Setup

* Install [Node.js >= v4.2.3 and npm](http://nodejs.org/)
* Clone this repo and install npm package dependencies:
```bash
$ git clone git@github.com:chenchaoyi/saucebreak.git
$ npm install
```

## Run tests

#### run tests:

```bash
# Set your Sauce Labs credential in environment variable
export SAUCE_USERNAME=your_user_name
export SAUCE_ACCESS_KEY=your_access_key

# Start command line:
SAUCE=true UPLOADAPP=true NODE_CONFIG='{"capabilities": {"app": "path_to_your_app"}}' ./node_modules/.bin/magellan --browsers=iphone_9_3_iOS_iPhone_Simulator

```

