const wdio = require('webdriverio');
import { serverConfig } from './configs/serverConfig';
import {appPackageAndroid, appPackageiOS} from './configs/pathAndPackageConfig';
import { appCaps } from './configs/capabilities';
import { platform } from './configs/environmentAndPlatformConfig';

/**
 * Utilities class for common Appium/wdio Driver functionality.
 */
class AppiumDriver {

	constructor() {
		this.driver = null;

		if (platform !== 'Android' && platform !== 'iOS')
			throw Error('Failed to identify platform. Ensure that mobile config is setup correctly.');
	}

	/**
     * Generates a new WebDriverIO Driver with basic configuration
     * @returns {Promise<import('webdriverio').BrowserObject>}
     */
	async generateDriver(customCapabilities = {}) {
		// merge all the capabilities
		const caps = {
			...serverConfig,
			capabilities: {
				...appCaps,
				...customCapabilities,
			}
		};

		// Start the session, merging all the caps
		return await wdio.remote(caps);
	};

	async setDriver(customCapabilities = {}) {
		this.driver = await this.generateDriver(customCapabilities);
		await this.driver.setTimeouts(10000);
		return this.driver;
	};

	async shutDown(customAppId = '') {
		if (this.driver) {
			let appId = customAppId? customAppId : platform === 'iOS'? appPackageiOS : appPackageAndroid;
			await this.driver.terminateApp(appId);
		}
	};
}

export default new AppiumDriver();