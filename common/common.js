'use strict';

var wd = require('wd'),
  PromiseChainWebdriver = wd.PromiseChainWebdriver,
  chai = require('chai'),
  should = chai.should();

var util = require('util'),
  url = require('url'),
  _ = require('lodash'),
  Q = require('q');

function AppiumDriver(server) {
  PromiseChainWebdriver.call(this, url.parse(server));
  this.modMethods = {};
}

util.inherits(AppiumDriver, PromiseChainWebdriver);

/****************************
        helper methods
****************************/

AppiumDriver.prototype.waitTillAvailable = function(selector, by) {
  by = by || 'accessibility id';
  return this.waitForElement(by, selector, {
    timeout: 60000,
    asserter: wd.isDisplayed
  });
};

AppiumDriver.prototype.waitTillNotAvailable = function(selector, by) {
  by = by || 'accessibility id';
  return this.waitForElement(by, selector, {
    timeout: 60000,
    asserter: wd.isNotDisplayed()
  });
};

// [by] could be 'name', 'xpath', 'accessibility id', '-ios uiautomation', etc; default is 'name'
AppiumDriver.prototype.clickEl = function(selector, by) {
  by = by || 'accessibility id';
  return this
    .waitTillAvailable(selector, by)
    // for the future analytics tests
    // .sleep((Math.random() * 2000) + 1)
    .click();
};

// Add extra 2 seconds force wait on clickEl
AppiumDriver.prototype.clickElwithForceWait = function(selector, by) {
  by = by || 'accessibility id';
  return this
    .sleep(2000)
    .waitTillAvailable(selector, by)
    .click();
};

// [by] could be 'name', 'xpath', 'accessibility id', '-ios uiautomation', etc; default is 'name'
AppiumDriver.prototype.typeEl = function(value, selector, by) {
  by = by || 'accessibility id';
  return this
    .waitTillAvailable(selector, by)
    .sendKeys(value);
};

AppiumDriver.prototype.getEls = function(selector, by) {
  by = by || 'class name';
  return this
    .waitTillAvailable(selector, by)
    .elements(by, selector);
};

AppiumDriver.prototype.getEl = function(selector, by) {
  by = by || 'accessibility id';
  return this
    .waitTillAvailable(selector, by)
    .element(by, selector);
};

AppiumDriver.prototype.hasEl = function(selector, by) {
  by = by || 'accessibility id';
  return this
    .hasElement(by, selector);
};

AppiumDriver.prototype.hasComponent = function(selector, by, assertion) {
  return this
    .hasEl(selector, by)
    .then(assertion);
};

  // [by] could be 'name', 'xpath', 'accessibility id', '-ios uiautomation', etc; default is 'name'
  AppiumDriver.prototype.getElAttribute = function(attr, selector, by) {
    by = by || 'accessibility id';
    return this
      .waitTillAvailable(selector, by)
      .getAttribute(attr);
  };

AppiumDriver.prototype.bindModule = function(mod) {
  var self = this;

  _.functions(mod).forEach(function(name) {
    if (!self.modMethods[name]) {
      self.modMethods[name] = {};
      self.modMethods[name].command = mod[name];
      self.modMethods[name].locators = mod.locators;
    } else {
      // throw out duplicated method name exception
      throw new Error(util.format('method %s (from %s) has already existed', name, mod.name));
    }

    var wrappedMethod = function() {
      var args = _.toArray(arguments);
      args.unshift(self, self.modMethods[name].locators);
      // args.unshift(self);

      var promise = new Q(self.modMethods[name].command.apply(self, args));
      self._enrich(promise);
      return promise;
    };

    // bind new promise to appium driver
    AppiumDriver.prototype[name] = wrappedMethod;
  });
};

AppiumDriver.prototype.resetModules = function() {
  this.modMethods = {};
};

AppiumDriver.prototype.getNavBarName = function(assertion) {
  return this
    .sleep(1000)
    .getElAttribute('name', '//UIANavigationBar[1]', 'xpath')
    .then(assertion);
};

AppiumDriver.prototype.getNavBarModalName = function(assertion) {
  return this
    .sleep(1000)
    .getElAttribute('name', '//UIANavigationBar[2]', 'xpath')
    .then(assertion);
};

// click built-in Cancel button
AppiumDriver.prototype.cancelLastMove = function(assertion) {
  return this
    .clickEl('Cancel');
};

// click built-in Back button
AppiumDriver.prototype.goBack = function(assertion) {
  return this
    .clickEl('Back');
};

// get Welcome msg
AppiumDriver.prototype.getWelcomeMsg = function(driver, loc, assertion) {
  return this
    .getElAttribute('name', '//UIAStaticText[contains(@name, "Welcome")]', 'xpath')
    .then(assertion);
};

AppiumDriver.prototype.scrollDown = function() {
  return this
    .execute("mobile: scroll", [{ direction: 'down' }])
};

AppiumDriver.prototype.scrollUp = function(driver) {
  return this
    .execute("mobile: scroll", [{ direction: 'up' }])
};

AppiumDriver.prototype.setMockLocation = function(latitude, longitude) {
  return this
    .setGeoLocation(latitude, longitude);
};

module.exports = AppiumDriver;
