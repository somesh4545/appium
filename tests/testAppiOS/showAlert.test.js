import { describe, it } from 'mocha';
import appiumDriver from '../../helpers/appiumDriver';
import chai from 'chai';
const { assert } = chai;

describe('Test App iOS', function () {
	let driver;
	let noFailedTests = true;
	let allPassed = false;

	// Setup
	before(async function () {
		driver = await appiumDriver.setDriver();
	});

	afterEach(async function () {
		if (this.currentTest.state !== 'passed'){
			noFailedTests = false;
		}
		allPassed = noFailedTests;
	});

	after(async function(){
		await appiumDriver.shutDown();
	});

	it('Validate show alert @smoke', async function () {
		let showAlertSumBtn = await driver.$('~show alert');
		assert.isTrue(await showAlertSumBtn.isDisplayed(), 'Show Alert button is displayed');
		await showAlertSumBtn.click();
		let alertDescriptionText = await driver.$('~this alert is so cool.');
		await alertDescriptionText.waitForDisplayed({timeout: 10000, timeoutMsg: 'Alert Description text is displayed'});
		let alertConsentBtn = await driver.$('~OK');
		assert.isTrue(await alertConsentBtn.isDisplayed(), 'Alert Consent button is displayed');
		await alertConsentBtn.click();
		let computeSumTitle = await driver.$('~ComputeSumButton');
		assert.isTrue(await computeSumTitle.isDisplayed(), 'Compute Sum title is displayed');
	});
});
