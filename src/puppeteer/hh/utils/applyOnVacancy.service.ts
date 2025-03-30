import { Page } from "puppeteer";

export const applyOnVacancy = async (page: Page) => {
	try {
		return await page.$eval(
			process.env.VACANCY_APPLY_MODAL_BUTTON_CLASS,
			(btn: HTMLButtonElement) => {
				btn.click();
			}
		);
	} catch (e) {
		throw new Error(`Can't apply on vacancy ${e}`);
	}
};
