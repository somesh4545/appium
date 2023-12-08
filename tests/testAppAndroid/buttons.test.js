import { describe, it } from 'mocha';
import appiumDriver from '../../helpers/appiumDriver';
import chai from 'chai';
const { assert } = chai;

describe('Test App Android', function () {
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

	it('Validate buttons @smoke', async function () {
		let viewsMenu = await driver.$('~Views');
		assert.isTrue(await viewsMenu.isDisplayed(), 'Views menu is displayed');
		await viewsMenu.click();

		let buttonsMenu = await driver.$('~Buttons');
		assert.isTrue(await buttonsMenu.isDisplayed(), 'Buttons menu is displayed');
		await buttonsMenu.click();

		let buttonsPageTitle = await driver.$('//*[@resource-id=\'android:id/action_bar\']/*[@text=\'Views/Buttons\']');
		assert.isTrue(await buttonsPageTitle.isDisplayed(), 'Buttons page title is displayed');

		let toggleButtonType = await driver.$('~Toggle');
		assert.isTrue(await toggleButtonType.isDisplayed(), 'Toggle button type is displayed');
		assert.equal(await toggleButtonType.getText(), 'OFF', 'Default toggle state is OFF');
		await toggleButtonType.click();
		assert.equal(await toggleButtonType.getText(), 'ON', 'Toggle state after switch is ON');
	});
});
