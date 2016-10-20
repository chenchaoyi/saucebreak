var Config = require('config');
var Moment = require('moment');
var Request = require('request');
var SauceLabs = require('saucelabs');

// var AppiumDriver = require('kunlun').AppiumDriver;
var AppiumDriver = require('./common');

var sauce_username = process.env.SAUCE_USERNAME;
var sauce_password = process.env.SAUCE_ACCESS_KEY;

var sauceAccount = new SauceLabs({
  username: sauce_username,
  password: sauce_password,
  proxy: Config.proxy
});

var appiumDriver;

// Handle Sauce Labs settings
if (process.env.SAUCE === 'true') {
  // Update SauceLabs settings
  Config.testServer = 'http://' + sauce_username + ':' + sauce_password + '@ondemand.saucelabs.com:80/wd/hub';
  Config.capabilities.app = 'sauce-storage:' + Config.remoteAppName;

  // configure Sauce tunnel if present from Magellan
  if (process.env.SAUCE_CONNECT_TUNNEL_ID !== null) {
    Config.capabilities.tunnelIdentifier = process.env.SAUCE_CONNECT_TUNNEL_ID;
  }

  appiumDriver = new AppiumDriver(Config.testServer);

  // Root beforeEach and afterEach to handle SauceLabs dashboard status
  beforeEach(function() {
    var title = this.currentTest.fullTitle();

    if (Config.desiredCapabilities) {
      // Based on --browsers value, Magellan sends back desiredCapabilities to each test
      // in NODE_CONFIG env variable, which can be extracted in Config.desiredCapabilities
      // Currently Magellan only returns desiredCapabilities like follows:
      // {
      //  "browserName":"iphone",
      //  "version":"9.2",
      //  "platform":"OS X 10.10",
      //  "deviceName":"iPhone Simulator"
      // }
      // Pending for https://github.com/TestArmada/guacamole/issues/15 to fully integrate
      Config.capabilities.platformVersion = Config.desiredCapabilities.version;
      Config.capabilities.deviceName = Config.desiredCapabilities.deviceName;
    }

    return appiumDriver.init(Config.capabilities).then(function() {
      // feed back selenium session ID to parent process (Magellan)
      if (process.send) {
        process.send({
          type: "selenium-session-info",
          sessionId: appiumDriver.sessionID
        });
      }

      // update Sauce dashboard status - job name
      sauceAccount.updateJob(appiumDriver.sessionID, {
        name: title
      }, function(err) {
        if (err) console.log(err);
      });
    }, function(reason) {
      // update Sauce dashboard status when failed to initiate appium - job name
      console.log("Error reason: "+JSON.stringify(reason))
      sauceAccount.updateJob(JSON.parse(reason.data).sessionId, {
        name: title
      }, function(err, res) {
        throw reason;
      });
    });
  });

  afterEach(function() {
    // update Sauce dashboard status - job result
    var build = process.env.BUILD === undefined ?
      Config.remoteAppName + '-' + Moment().format() :
      Config.remoteAppName + '-' + process.env.BUILD;
    var passed = this.currentTest.state === 'passed' ? 1 : 0;
    sauceAccount.updateJob(appiumDriver.sessionID, {
      build: build,
      passed: passed
    }, function(err) {
      if (err) console.log(err);
    });

    return appiumDriver.quit();
  });
} else {
  appiumDriver = new AppiumDriver(Config.testServer);

  beforeEach(function() {
    return appiumDriver.init(Config.capabilities);
  });

  afterEach(function() {
    return appiumDriver.quit();
  });
}

module.exports = {
  capabilities: Config.capabilities,
  testServer: Config.testServer,
  appiumDriver: appiumDriver
};
