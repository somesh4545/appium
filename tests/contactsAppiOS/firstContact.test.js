import { describe, it } from 'mocha';
import appiumDriver from '../../helpers/appiumDriver';
import chai from 'chai';
const { assert } = chai;
import { platform } from '../../helpers/configs/environmentAndPlatformConfig';

describe('Contacts App', function () {
	let driver;
	let noFailedTests = true;
	let allPassed = false;

	// Setup
	before(async function () {
		driver = await appiumDriver.setDriver({
			'appium:bundleId': platform === 'iOS'? 'com.apple.MobileAddressBook' : 'com.android.contacts',
			'appium:app': '',
			'appium:appPackage': ''
		});
	});

	afterEach(async function () {
		if (this.currentTest.state !== 'passed'){
			noFailedTests = false;
		}
		allPassed = noFailedTests;
	});

	after(async function(){
		await appiumDriver.shutDown(platform === 'iOS'? 'com.apple.MobileAddressBook' : 'com.android.contacts');
	});

	it('Open first contact in contacts App @smoke', async function () {
		let firstContact = await driver.$('//XCUIElementTypeCell[@name="John Appleseed"]');
		assert.isTrue(await firstContact.isDisplayed(), 'First contact is displayed');
		await firstContact.click();
		let mailTab = await driver.$('~mail');
		await mailTab.waitForDisplayed({timeout: 10000, timeoutMsg: 'Mail Tab is displayed'});
		let callTab = await driver.$('~call');
		await callTab.waitForExist({timeout: 10000, timeoutMsg: 'Call Tab is present'});
		await driver.pause(3000);
	});
});
