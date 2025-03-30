import { Page } from "puppeteer";

export const clickSearchButton = async (page: Page) => {
	try {
		await page.$eval(
			process.env.SEARCH_BUTTON_CLASS,
			(el: HTMLButtonElement) => {
				el.click();
			}
		);
	} catch (e) {
		console.error("button doesnt exist", e);
	}
};
