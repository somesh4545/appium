import path from 'path';
import { appSchema } from './environmentAndPlatformConfig';

const LOCAL_ASSET_BASE = path.resolve(__dirname, '..');
const DEFAULT_IOS_ALPHA_APP_PATH = path.resolve(LOCAL_ASSET_BASE, '../../Project-Appium-Mocha-IOS-Android-Sample/artifacts/TestApp-iphonesimulator.app');
const DEFAULT_IOS_RELEASE_APP_PATH = path.resolve(LOCAL_ASSET_BASE, '../../Project-Appium-Mocha-IOS-Android-Sample/artifacts/TestApp-iphonesimulator.app');
const DEFAULT_ANDROID_ALPHA_APP_PATH = path.resolve(LOCAL_ASSET_BASE, '../../Project-Appium-Mocha-IOS-Android-Sample/artifacts/ApiDemos-debug.apk');
const DEFAULT_ANDROID_RELEASE_APP_PATH = path.resolve(LOCAL_ASSET_BASE, '../../Project-Appium-Mocha-IOS-Android-Sample/artifacts/ApiDemos-debug.apk');

const DEFAULT_IOS_APP_PATH = appSchema === 'RELEASE' ? DEFAULT_IOS_RELEASE_APP_PATH : DEFAULT_IOS_ALPHA_APP_PATH;
const iosAppPath = process.env.APPIUM_IOS_APP_PATH || DEFAULT_IOS_APP_PATH;

const DEFAULT_ANDROID_APP_PATH = appSchema === 'RELEASE' ? DEFAULT_ANDROID_RELEASE_APP_PATH : DEFAULT_ANDROID_ALPHA_APP_PATH;
const androidAppPath = process.env.APPIUM_ANDROID_APP_PATH || DEFAULT_ANDROID_APP_PATH;

const appPackageAndroid = appSchema === 'RELEASE'? 'io.appium.android.apis' : 'io.appium.android.apis';
const appPackageiOS = appSchema === 'RELEASE'? 'io.appium.TestApp' : 'io.appium.TestApp';

export {
	iosAppPath,
	androidAppPath,
	appPackageiOS,
	appPackageAndroid
};