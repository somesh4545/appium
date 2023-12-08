import { main as appiumServer } from 'appium';
import { serverConfig } from './configs/serverConfig';

/**
 * Service hook utilized by ./.mocharc.json
 */
exports.mochaHooks = async () => {
	let _serverInstance = undefined;
	
	return {
		beforeAll: [
			async function () {
				if (serverConfig.localServer !== 'enabled') {
					console.log('SKIP LOCAL APPIUM SERVER - START');
					return;
				}

				console.log('---------------------- STARTING Local Appium Server');
				let args = {
					port: serverConfig.port,
					host: serverConfig.host,
					logfile: serverConfig.logPath
				};
				_serverInstance = await appiumServer(args);
			}
		],
		afterAll: [
			async function () {
				if (serverConfig.localServer !== 'enabled') {
					console.log('SKIP LOCAL APPIUM SERVER - STOP');
					return;
				}

				if (_serverInstance) {
					console.log('---------------------- STOPPPING Local Appium Server');
					await _serverInstance.close();

					// There are times where _serverInstance.close() gets stuck. We can increase this time limit as we discover we need to.
					setTimeout(() => {
						process.exit(0);
					}, 5000);
				}
			}
		],
	};
};