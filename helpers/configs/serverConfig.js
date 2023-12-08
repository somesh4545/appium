const serverConfig = {
	host: process.env.APPIUM_HOST || '127.0.0.1',
	port: process.env.APPIUM_PORT || 4724,
	path: process.env.APPIUM_PATH || '/',
	logPath: process.env.APPIUM_LOG_PATH || './artifacts/appiumServerLog.log',
	logLevel: 'error',
	localServer: process.env.APPIUM_LOCAL_SERVER || 'enabled',
	showXcodeLog: 'true'
};

export {serverConfig};