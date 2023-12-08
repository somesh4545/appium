import { describe, it } from 'mocha';
import appiumDriver from '../../helpers/appiumDriver';
import chai from 'chai';
import {platform} from '../../helpers/configs/environmentAndPlatformConfig';
const { assert } = chai;

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

	it('Open second contact in contacts App', async function () {
		let secondContact = await driver.$('//XCUIElementTypeCell[@name="Kate Bell"]');
		assert.isTrue(await secondContact.isDisplayed(), 'Second contact is displayed');
		await secondContact.click();
		let mailTab = await driver.$('~mail');
		await mailTab.waitForDisplayed({timeout: 10000, timeoutMsg: 'Mail Tab is displayed'});
		let callTab = await driver.$('~call');
		await callTab.waitForExist({timeout: 10000, timeoutMsg: 'Call Tab is present'});
		await driver.pause(3000);
	});
});
