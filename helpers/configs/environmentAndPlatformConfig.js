import environmentConstants from './environmentConstants.json';

const DEFAULT_ENVIRONMENT = 'QA3';
const environmentName = process.env.ENVIRONMENT || DEFAULT_ENVIRONMENT;
const DEFAULT_PLATFORM = 'iOS'; //iOS or Android
const platform = process.env.PLATFORM || DEFAULT_PLATFORM;
const DEFAULT_APP_SCHEMA = environmentConstants[environmentName]['schema'];
const appSchema = process.env.APP_SCHEMA || DEFAULT_APP_SCHEMA;

export {
	environmentName,
	platform,
	appSchema
};