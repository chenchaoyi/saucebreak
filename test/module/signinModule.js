
module.exports = {
  locators: {
    xpath: {
      //xpath locators
      alert: '//UIAAlert',
      shop_tab_bar_item_selected: '//UIATabBar[1]/UIAButton[1][@name="Shop" and @value="1"]',
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
  }

};
