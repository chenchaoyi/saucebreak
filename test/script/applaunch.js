'use strict';

var SigninModule = require('../module/signinModule');
var testEnvironment = require('../../common/test_environment');

describe('Application Launch - ', function() {

  var appiumDriver = testEnvironment.appiumDriver;

  before(function() {
    appiumDriver.resetModules();
    appiumDriver.bindModule(SigninModule);
  });

  it('Launch Application and dismiss any popups', function() {
    return appiumDriver
      .dismissPrivacyAccessAlerts()
      .execute("sauce: break")
      .then(function(){
        console.log('=== Your Manual Test Session is Ready ===');
        console.log('  Please go to the following link to start your manual test:' );
        console.log('  https://saucelabs.com/beta/tests/' + appiumDriver.sessionID + '/watch' );
      })
      .sleep(900000)
  });

});
