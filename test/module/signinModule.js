var assert = require('chai').assert;
var wd = require("wd");

module.exports = {
  locators: {
    xpath: {
      //xpath locators
      email: '//UIATextField[@value="Email"]',
      password: '//UIASecureTextField[@value="Password"]',
      user_name: '//UIANavigationBar[@name="Shop"]/UIAStaticText[2]',
      error_popup: '//UIAAlert[1]/UIAScrollView[1]/UIAStaticText[2]',
      alert: '//UIAAlert',
      shop_tab_bar_item: '//UIATabBar[1]/UIAButton[1][@name="Shop"]',
      shop_tab_bar_item_selected: '//UIATabBar[1]/UIAButton[1][@name="Shop" and @value="1"]',
      shop_button: '//UIANavigationBar[1]/UIAButton[@name="Shop"]',
      navbar_signin: '//UIANavigationBar[@name = "Sign In"]',
      map_annotation: '//UIAMapView[1]/UIAPopover',
      signin_button: '//UIAButton[@name="Sign In"]',
      dismiss_button_login_modal: '//UIAButton[@name="closeModal"]'
    },
    acc_id: {
      //Accessibility_id locators
      signin: 'Sign In',
      ok: 'OK',
      account: 'Account',
      signout: 'Sign Out',
      shop: 'Shop',
      stores: 'Stores',
      dismiss: 'Dismiss',
      allow: 'Allow',
      not_allow: 'Don’t Allow',
      cancel: 'Cancel',
      skip: 'SKIP',
      done: 'DONE'
    }
  },

  waitForChristmasTreeAnimation: function(driver) {
    var waitTimeForChristmasTreeAnimation = 5000;
    return driver
      .sleep(waitTimeForChristmasTreeAnimation);
  },

  allowAccess: function(driver, loc) {
    return driver
      //allow notifications
      .hasEl(loc.acc_id.ok)
      .then(function(assertion) {
        if (assertion == true) {
          return driver
            .clickEl(loc.acc_id.ok);
        }
      })
      .sleep(1000)
      //allow location when in use
      .hasEl(loc.acc_id.allow)
      .then(function(assertion) {
        if (assertion == true) {
          return driver
            .clickEl(loc.acc_id.allow);
        }
      })
      .sleep(1000)
      //not allow location always
      .hasEl(loc.acc_id.cancel)
      .then(function(assertion) {
        if (assertion == true) {
          return driver
            .clickEl(loc.acc_id.cancel);
        }
      })
  },

  dismissPrivacyAccessAlerts: function(driver, loc) {
    return driver
      // notifications alert
      .hasEl(loc.acc_id.not_allow)
      .then(function(assertion) {
        if (assertion == true) {
          return driver
            .clickEl(loc.acc_id.not_allow);
        }
      })
      .sleep(1000)
        // location alert
      .hasEl(loc.acc_id.not_allow)
      .then(function(assertion) {
        if (assertion == true) {
          return driver
            .clickEl(loc.acc_id.not_allow);
        }
      })
  },

  allowNotificationNotAllowLocation: function(driver, loc) {
    return driver
      .hasEl(loc.acc_id.ok)
      .then(function(assertion) {
        if (assertion == true) {
          return driver
            .clickEl(loc.acc_id.ok);
        }
      })
      .sleep(1000)
      .hasEl(loc.acc_id.not_allow)
      .then(function(assertion) {
        if (assertion == true) {
          return driver
            .clickEl(loc.acc_id.not_allow);
        }
      })
  },

  notAllowNotificationAllowLocationWhenUsingApp: function(driver, loc) {
    return driver
      .hasEl(loc.acc_id.not_allow)
      .then(function(assertion) {
        if (assertion == true) {
          return driver
            .clickEl(loc.acc_id.not_allow);
        }
      })
      .sleep(1000)
      .hasEl(loc.acc_id.allow)
      .then(function(assertion) {
        if (assertion == true) {
          return driver
              //location when in use
            .clickEl(loc.acc_id.allow);
        }
      })
      .sleep(1000)
      .hasEl(loc.acc_id.cancel)
      .then(function(assertion) {
        if (assertion == true) {
          return driver
              //location always
            .clickEl(loc.acc_id.cancel);
        }
      })
  },

  notAllowNotificationAlwaysAllowLocation: function(driver, loc) {
    return driver
      .hasEl(loc.acc_id.not_allow)
      .then(function(assertion) {
        if (assertion == true) {
          return driver
            .clickEl(loc.acc_id.not_allow);
        }
      })
      .sleep(1000)
      .hasEl(loc.acc_id.allow)
      .then(function(assertion) {
        if (assertion == true) {
          return driver
              //location when in use
            .clickEl(loc.acc_id.allow);
        }
      })
      .sleep(1000)
      .hasEl(loc.acc_id.allow)
      .then(function(assertion) {
        if (assertion == true) {
          return driver
              //location always
            .clickEl(loc.acc_id.allow);
        }
      })
  },

  retryLogin: function(driver, loc, password) {
    var waitTimeForNetworkOutage = 5000;
    return driver
      .sleep(waitTimeForNetworkOutage)
      .typeEl(password, loc.xpath.password, 'xpath')
      .keys(wd.SPECIAL_KEYS.Return)
      .checkForLoginFailure(true)
  }

};
