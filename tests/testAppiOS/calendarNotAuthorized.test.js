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

	it('Validate calendar not authorized', async function () {
		let checkCalendarBtn = await driver.$('~Check calendar authorized');
		assert.isTrue(await checkCalendarBtn.isDisplayed(), 'Check Calendar Authorized button is displayed');
		await checkCalendarBtn.click();
		let notAuthorizedLabel = await driver.$('~not authorized');
		await notAuthorizedLabel.waitForDisplayed({timeout: 10000, timeoutMsg: 'Not Authorized Label is displayed'});
		let computeSumTitle = await driver.$('~ComputeSumButton');
		await computeSumTitle.waitForDisplayed({timeout: 10000, timeoutMsg: 'Compute sum title is displayed'});
	});
});
