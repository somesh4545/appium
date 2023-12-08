# Automation with Appium NodeJS

## Setup

* Install [Java](https://www.oracle.com/java/technologies/downloads/#jdk18-mac) - use x64 DMG installer - .dmg file
    * Setup `JAVA_HOME`:
        * Windows:
        * 
            * Add to your environment variables.
        * macOS:
            * Add the following to `~/.bash_profile` or `~/.zshrc` settings.
                * `export JAVA_HOME=$(/usr/libexec/java_home)`
                * To edit, open a terminal and use `nano .zshrc` or `nano .bash_profile` 
              
* Install [NodeJS and NPM](https://nodejs.org/en/download/). Check the downloaded node version by running this command in terminal:
```bash
node -v
```

* Clone and open the [Project-Appium-Mocha-IOS-Android-Sample repository](https://github.com/annastrik/Project-Appium-Mocha-IOS-Android-Sample).

* Build the sample test application for iOS from [this repository](https://github.com/appium/ios-test-app) (open the project and run _npm install_). Place the sample iOS build in `artifacts/` folder that is located under the project root.

* Build the sample test application for Android from [this repository](https://github.com/appium/android-apidemos) (open the project and run _npm run build_ => ./apks/ApiDemos-debug.apk will be generated). Place the sample Android build in `artifacts/` folder that is located under the project root.

* Install dependencies by running `npm install` after navigating to the root of the project.
    * Run `npm install` after a pull in the event of a `package.json` update.
  
* Install [Appium](https://appium.github.io/appium/docs/en/2.0/quickstart/install/):

```bash
sudo npm install -g appium
```
* [Install Appium drivers](https://www.headspin.io/blog/installing-appium-2-0-and-the-driver-and-plugins-cli). Appium 2.0 has the Android and iOS drivers separate from itself now.

```bash
appium driver install xcuitest
appium driver install uiautomator2
```

* Install [Appium Inspector](https://github.com/appium/appium-inspector/releases). If the following error message occurs on attempt to open Appium Inspector: 'can’t be opened because Apple cannot check it for malicious software.', run the following command in Terminal:
```bash
  xattr -cr "/Applications/Appium Inspector.app"
```

* Start Appium by running command `appium` in terminal. Open Appium Inspector. Check Remote Path field. Add / there (ensure there is no /wd/hub).

### iOS (MacOS only)

* Download and install Xcode:

    * Open [Apple Developer site](https://developer.apple.com/download/all/), search for the latest Xcode version, download and install it.
    * Authorize in Xcode: Create and authorize [new access token on Github account](https://github.com/settings/tokens). Open Xcode → Preferences → Accounts. Click on + and login with Github account and newly created access token.
    * Go to Xcode > Preferences > Platforms tab and ensure required iOS OS Platform version is listed there. If not, click on + sign in the bottom left corner and download & install one.
    * Go to Xcode > Window > Devices and Simulators tab and ensure required simulator is listed there. If not, click on + sign in the bottom left corner and create it choosing the required combination of Device type and OS Platform version.
    * Run this command to check which Xcode CLI you are using:<br>
      `xcode-select --print-path`<br>
      (should be `/Applications/Xcode.app/Contents/Developer`)<br>
      If it is not the right one then run this command:<br>
      `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`<br>
      Run this command to check that the list of known devices is being uploaded properly:<br>
      `xcrun xctrace list devices`
    
* Check if you have [homebrew](https://brew.sh/). If not, then follow [installation instructions](https://brew.sh/).

* Install carthage through:

```bash
brew install carthage
```

### Android (MacOS only)

- Download and install Android Studio.
    - Download the emulator and build tools:
        - Android Studio > Settings > Appearance & Behavior > System Settings > Android SDK
        - SDK Platforms tab: 
            - Android 12.0 (S) and any version you want
            - You can also remove versions by Unchecking them and hitting ‘Apply’ and ‘Ok’
        - SDK Tools tab:
            - Android SDK Build-Tools 
            - Android SDK Command-line Tools (latest)
            - Android Emulator
            - Android SDK Platform-Tools
- Follow the steps in Android Studio to create the emulator 
    - Tools > Device Manager > ‘Create Device’ button 
- Set up ANDROID_HOME in environment variables
    - Run `echo $SHELL` in terminal
    - If you get `/bin/bash`, open your `.bashrc` 
    - If you get `/bin/zsh`, open your `.zshrc` 
    - In that file, add:
      ```
      export ANDROID_SDK_ROOT="/Users/YOUR_USER_NAME/Library/Android/sdk" 
      export ANDROID_HOME=$ANDROID_SDK_ROOT
      export PATH=$ANDROID_SDK_ROOT/emulator:$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$PATH
      ```
    - Close and re-open terminal
    - Ensure you can do the `adb`, `emulator`, `sdkmanager` and `avdmanager` commands in Terminal   
    
<details>
<summary>Running Android Emulator outside of Android Studio:</summary>

- If you have NOT installed Android Studio and want to run emulator through command line
    - Download and unzip file from the "Command line tools only" section of the Android Studio website.
    - Place 'cmdline-tools' in another folder and put in location of your choosing (Android Studio uses `/Users/YOUR_USER_NAME/Library/Android/sdk`)
    - Set the ANDROID_HOME environment variable in a similar file structure as above
- If you have already installed Android Studio 
    - Ensure your ANDROID_HOME is set, and you can do the `emulator`, `sdkmanager` and `avdmanager` commands
    - List all emulators available:
        ```
        emulator -list-avds
        ```
    - Run the emulator with
        ```
        emulator @NAME_OF_AVD
        ```    
- To create an emulator through command line:      
    - Install packages you want for the emulator:
        ```
        sdkmanager "platforms;android-31"
        sdkmanager "system-images;android-31;google_apis;x86_64"
        sdkmanager "build-tools;34.0.0”
        ```
    - Create the emulator profile (Android Virtual Device (AVD)):
        ```
        avdmanager create avd --name NAME_OF_AVD --package "system-images;android-31;google_apis;x86_64"
        ```

- Additional tips: 
    - List all packages available with `sdkmanager --list`
    - List all packages already installed with `sdkmanager --list_installed`
    - List all emulators available with `emulator -list-avds`
    - Use `-wipe-data` flag to run emulator with wiped data, ex. `emulator @NAME_OF_AVD -wipe-data`
    - Modify additional settings (disk space, skin, etc) in the `/Users/YOUR_USER_NAME/.android/avd/NAME_OF_AVD.avd` folder, likely in the `config.ini` file
</details>


## Tracked Environment Variables

* ENVIRONMENT
    * `(string) Environment. Ex: QA3 || PRODUCTION`
* PLATFORM
    * `(string) Platform name. Ex: iOS || Android`
* APPIUM_IOS_DEVICE_NAME
  * `(string) iOS Device Name. Ex: iPhone 7 || iPhone 5 SE`
* APPIUM_IOS_PLATFORM_VERSION
  * `(string) iOS Version. Ex: 12.0 || 10.4`
* APPIUM_ANDROID_DEVICE_NAME
  * `(string) Android Device Name. Not used, but required field. Default: Android Device`
* APPIUM_ANDROID_PLATFORM_VERSION
  * `(string) Android Target Version. Ex: 10.0 || 9.0`
* APPIUM_HOST
  * `(string) Host Address connection override. Default: localhost`
* APPIUM_PORT
  * `(number) Port Agent connection override. Default: 4724`
* APPIUM_PATH
  * `(string) Base Path override. Default: /wd/hub`
* APPIUM_LOG_PATH
  * `(string) Relative path to where the server logfile is written if local_server is enabled. Default: ./artifacts/appiumServerLog.log`
* APPIUM_LOCAL_SERVER
  * `(string) Starts local Appium server. Default: 'enabled', anything else will disable it.`
* APPIUM_IOS_APP_PATH
  * `(string) Relative path to where the IOS app is present. `
* APPIUM_ANDROID_APP_PATH
  * `(string) Relative path to where the Android app is present.`
 
## Running Tests

  * If `APPIUM_LOCAL_SERVER` is not enabled, run `appium` in terminal with correct port (`APPIUM_PORT` defaults to 4724)

#### Running the preconfigured test scripts
Run scripts can be configured in `package.json` under `scripts` <br>
iOS:<br>
```bash
npm run full-ios
```
Android (the default platform set in configurations files is iOS, thus we have to specify the platform in the command to run Android tests): <br>
```bash
PLATFORM='Android' npm run full-android
```

#### Running single tests in directory
To run tests in directory, run 
```bash
npm run test <testname>
```
or
```bash
npm run full-ios -- -g 'Validate show alert.*'
```
```bash
PLATFORM='Android' npm run full-android -- -g 'Validate expandable lists'
```

#### Running tests with filter
The example of filtering tests matching one pattern OR another in description (suite or test name):
```bash
npm run full-ios -- -g 'Open first contact in contacts App.*|Validate calendar not authorized.*'
```
The example of filtering tests matching one pattern AND another in description (suite or test name):
```bash
npm run full-ios -- -g '(?=.*Test App iOS)(?=.*@smoke)'
```

#### Running allure report
```bash
npm run open-allure
```