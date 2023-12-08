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

	it('Validate expandable lists', async function () {
		let viewsMenu = await driver.$('~Views');
		assert.isTrue(await viewsMenu.isDisplayed(), 'Views menu is displayed');
		await viewsMenu.click();

		let expandableListsMenu = await driver.$('~Expandable Lists');
		assert.isTrue(await expandableListsMenu.isDisplayed(), 'Expandable Lists menu is displayed');
		await expandableListsMenu.click();

		let customAdapterListType = await driver.$('~1. Custom Adapter');
		assert.isTrue(await customAdapterListType.isDisplayed(), 'Custom Adapter List Type is displayed');
		await customAdapterListType.click();

		let listItems = ['People Names', 'Dog Names', 'Cat Names', 'Fish Names'];
		for (let listItem of listItems) {
			let listItemElement = await driver.$(`//*[@text='${listItem}']`);
			assert.isTrue(await listItemElement.isDisplayed(), `List Item '${listItem}' is displayed`);
		}
	});
});
