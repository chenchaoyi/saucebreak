# Tool for manual controlling Mobile Application on Sauce Labs

Do you know Sauce Labs has a **hidden** feature that allows you to have
full control over simulator/emulator and do
manual testing for native mobile applications?

However, it requires quite a hack/workaround before you can make it work.

This tool helps you:
- Automatically upload your application to Sauce Labs storage
- Quickly bypass all the hack that are needed for the setup
- Automatically setup [Sauce Connect](https://wiki.saucelabs.com/display/DOCS/Sauce+Connect+Proxy) tunnel between your local machine and Sauce Labs VM so the mobile application tested could access the internal network resources
- Support both iOS and Android

All you need to do is to start the tool in a terminal, then go to the link printed out in the terminal when it finishes setup, and from there you'll have full manual control over your mobile application in the specified simulator/emulator.

## Setup

* Install [Node.js >= v4.2.3 and npm](http://nodejs.org/)
* Clone this repo and install npm package dependencies:
```bash
$ git clone git@github.com:chenchaoyi/saucebreak.git
$ npm install
```

## Usage

```bash
# First set your Sauce Labs credential in environment variable:
export SAUCE_USERNAME=your_user_name
export SAUCE_ACCESS_KEY=your_access_key
```

### Regular mobile application manual control
e.g.: If you only need to manually test the mobile application without Sauce Connect

```bash
# Start command line
# for iOS:
UPLOADAPP=true APP_PATH=path_to_your_app ./node_modules/.bin/magellan --browsers=iphone_9_3_iOS_iPhone_Simulator

# for Android:
NODE_ENV=android UPLOADAPP=true APP_PATH=path_to_your_app ./node_modules/.bin/magellan --browsers=android_5_1_Linux_Android_Emulator
```

### Mobile application manual control with newly created network tunnel
e.g.: If you are inside internal network (in the office or have access through VPN), and want to manually test the mobile application by yourself with internal network access
```bash
# Start command line
# for iOS:
UPLOADAPP=true APP_PATH=path_to_your_app ./node_modules/.bin/magellan --browsers=iphone_9_3_iOS_iPhone_Simulator --create_tunnels

# for Android:
NODE_ENV=android UPLOADAPP=true APP_PATH=path_to_your_app ./node_modules/.bin/magellan --browsers=android_5_1_Linux_Android_Emulator --create_tunnels
```

### Mobile application manual control with existed network tunnel
e.g.: If someone inside the internal network has setup a Sauce Connect tunnel and share the tunnel ID with you, then even if you don't have internal network access, you can still use this tunnel ID to gain the internal network access with your mobile application:
```bash
# Start command line
# for iOS:
UPLOADAPP=true APP_PATH=path_to_your_app ./node_modules/.bin/magellan --browsers=iphone_9_3_iOS_iPhone_Simulator --sauce_tunnel_id=shared_tunnel_id

# for Android:
NODE_ENV=android UPLOADAPP=true APP_PATH=path_to_your_app ./node_modules/.bin/magellan --browsers=android_5_1_Linux_Android_Emulator --sauce_tunnel_id=shared_tunnel_id
```

### Mobile application manual control with existed network tunnel shared from Sauce Labs parent account
For an complete example of this, please refer to [this wiki page](https://github.com/chenchaoyi/saucebreak/wiki/How-to-set-up-Sauce-Connect-and-share-it-with-others).
```bash
# Start command line
# for iOS:
UPLOADAPP=true APP_PATH=path_to_your_app SAUCE_CONNECT_PARENT_TUNNEL_ID=parent_sauce_labs_username ./node_modules/.bin/magellan --browsers=iphone_9_3_iOS_iPhone_Simulator --sauce_tunnel_id=shared_tunnel_id

# for Android:
NODE_ENV=android UPLOADAPP=true APP_PATH=path_to_your_app SAUCE_CONNECT_PARENT_TUNNEL_ID=parent_sauce_labs_username ./node_modules/.bin/magellan --browsers=android_5_1_Linux_Android_Emulator --sauce_tunnel_id=shared_tunnel_id
```
