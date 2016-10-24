# Sauce Labs manual testing tool for Mobile Application

Do you know Sauce Labs has a `hidden` feature that allows you to have
full control over simulator/emulator and do
manual mobile appliation testing?

However, to do this, it requires quite a hack.

This tool helps you:
- Automatically upload your application to Sauce Labs storage
- Quickly bypass all the hack that are needed for the setup
- Automatically setup Sauce Connect tunnel between your local machine and Sauce Labs VM so the mobile app tested has all the internal resources access

All you need to do is to start the tool, then go to your Sauce Labs dashboard and wait for the full control
over the simulator/emulator.

## Setup

* Install [Node.js >= v4.2.3 and npm](http://nodejs.org/)
* Clone this repo and install npm package dependencies:
```bash
$ git clone git@github.com:chenchaoyi/saucebreak.git
$ npm install
```

## Usage

```bash
# Set your Sauce Labs credential in environment variable
export SAUCE_USERNAME=your_user_name
export SAUCE_ACCESS_KEY=your_access_key

# Start command line:
SAUCE=true UPLOADAPP=true NODE_CONFIG='{"capabilities": {"app": "path_to_your_app"}}' ./node_modules/.bin/magellan --browsers=iphone_9_3_iOS_iPhone_Simulator

```

