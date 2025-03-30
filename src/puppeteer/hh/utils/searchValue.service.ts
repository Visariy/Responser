import { Page } from "puppeteer";

export const addValueToSearchInput = async (page: Page) => {
	try {
		await page.$eval(
			process.env.SEARCH_INPUT_ID,
			(el: HTMLInputElement, value) => {
				el.value = value;
			},
			process.env.WHAT_WE_SEARCH
		);
	} catch (e) {
		throw new Error(`cant add value to search input ${e}`);
	}
};
