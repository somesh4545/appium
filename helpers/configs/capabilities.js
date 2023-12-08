import { platform } from './environmentAndPlatformConfig';
import { DEVICE_IOS_ONE, DEVICE_ANDROID_ONE } from './devicesConfig';
import { appPackageiOS, appPackageAndroid, iosAppPath, androidAppPath } from './pathAndPackageConfig';

const iosCaps = {
	'platformName': 'iOS',
	'appium:automationName': 'XCUITest',
	'appium:deviceName': DEVICE_IOS_ONE.iOSDevice,
	'appium:platformVersion': DEVICE_IOS_ONE.iOSPlatformVersion,
	'appium:app': iosAppPath,
	'appium:appPackage': appPackageiOS,
	'appium:orientation': 'PORTRAIT',
	'appium:showIOSLog': false,
	'appium:language': 'en',
	'appium:noReset': false,
	'appium:autoAcceptAlerts': true,
	'appium:newCommandTimeout': 0 //uncomment for no time out, useful for manual inspection
};

const androidCaps = {
	'platformName': 'Android',
	'appium:automationName': 'UiAutomator2',
	'appium:deviceName': DEVICE_ANDROID_ONE.androidDevice,
	'appium:platformVersion': DEVICE_ANDROID_ONE.androidPlatformVersion,
	'appium:orientation': 'PORTRAIT',
	'appium:language': 'en',
	'appium:locale': 'US',
	'appium:noReset': false,
	'appium:newCommandTimeout': 0,
	'appium:appPackage': appPackageAndroid,
	'appium:appActivity': 'io.appium.android.apis.ApiDemos',
	'appium:app': androidAppPath
};

const appCaps = platform === 'iOS'? iosCaps : platform === 'Android'? androidCaps : undefined;

export {appCaps};