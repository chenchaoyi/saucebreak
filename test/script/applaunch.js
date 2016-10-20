'use strict';

var SigninModule = require('../module/signinModule');
var testEnvironment = require('../../common/test_environment');

describe('Application Launch', function() {

  var appiumDriver = testEnvironment.appiumDriver;

  before(function() {
    appiumDriver.resetModules();
    appiumDriver.bindModule(SigninModule);
     require('../../config/logging').configure(appiumDriver);
  });

  it('Launch Application and dismiss any popups', function() {
    return appiumDriver
      .dismissPrivacyAccessAlerts()
      .waitForChristmasTreeAnimation()
      .execute("sauce: break")
      .sleep(900000)
  });

});
