import appiumDriver from './appiumDriver';
import chai from 'chai';
const { assert } = chai;

class AppiumDriverUtil {

	async clickElement(existingDriver, uiElement){
		let elementToClick = await existingDriver.$(uiElement);
		assert.isTrue(await elementToClick.isDisplayed(), `Element with selector ${uiElement} is displayed`);
		await elementToClick.click();
	};

	async setElementValue(existingDriver, uiElement, value){
		let elementToSet = await existingDriver.$(uiElement);
		await elementToSet.setValue(value);
	};

	async waitForElementToExist(existingDriver, uiElement, timeout = 10000){
		let elementToWaitFor =  typeof uiElement === 'string' ? await existingDriver.$(uiElement) : uiElement;
		await elementToWaitFor.waitForExist({timeout: timeout, 
			timeoutMsg: `element ${uiElement} does not exist on the page after ${timeout} ms`});
		return elementToWaitFor;
	};

	async waitForElementToNotExist(existingDriver, uiElement, timeout = 10000){
		let elementToWaitForNotExist =  typeof uiElement === 'string' ? await existingDriver.$(uiElement) : uiElement;
		await elementToWaitForNotExist.waitForExist({
			timeout: timeout, reverse: true,
			timeoutMsg: `element ${uiElement} still exists on the page after ${timeout} ms`
		});
		return elementToWaitForNotExist;
	};

	async waitForAndClickElement(existingDriver, uiElement, timeout = 10000){
		let elementToWaitFor = await existingDriver.$(uiElement);
		await elementToWaitFor.waitForExist({timeout: timeout});
		await elementToWaitFor.click();
	};

	async waitForElementToDisplay(existingDriver, uiElement, timeout = 10000, customMsg = undefined){
		let elementToWaitFor =  typeof uiElement === 'string' ? await existingDriver.$(uiElement) : uiElement;
		let msg = customMsg || `element ${typeof uiElement === 'string'? uiElement : uiElement.selector} is not displayed after ${timeout} ms`;
		await elementToWaitFor.waitForDisplayed({timeout: timeout,
			timeoutMsg: msg});
		return elementToWaitFor;
	};

	async waitForElementNotToDisplay(existingDriver, uiElement, timeout = 10000){
		let elementToWaitForNotDisplayed =  typeof uiElement === 'string' ? await existingDriver.$(uiElement) : uiElement;
		await elementToWaitForNotDisplayed.waitForDisplayed({
			timeout: timeout, reverse: true,
			timeoutMsg: `element ${uiElement} is still displayed after ${timeout} ms`
		});
		return elementToWaitForNotDisplayed;
	};

	async waitForDisplayedAndClickElement(existingDriver, uiElement, timeout = 10000){
		let elementToWaitFor = await this.waitForElementToDisplay(existingDriver, uiElement, timeout);
		await elementToWaitFor.click();
	};

	async waitForNonEmptyValue(existingDriver, uiElement, timeout = 10000){
		let elementToWaitForValue = await existingDriver.$(uiElement);
		await appiumDriver.driver.waitUntil(async()=> (await elementToWaitForValue.getValue()) !== null, {timeout: timeout});
	};
}

export default new AppiumDriverUtil();
