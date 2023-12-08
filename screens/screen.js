import { platform } from '../helpers/configs/environmentAndPlatformConfig';
/**
 * Model for the XXX screen.
 */
class Screen {
	constructor() {
		if (platform === 'Android') {
		} else if (platform === 'iOS') {
		}

		/**
		 * Validates on pages
		 * @returns {Promise<void>}
		 */
		this.validateOnPage = async function validateOnPage() {
		};
	}
}

export default new Screen();