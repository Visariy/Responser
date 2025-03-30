import { Page } from "puppeteer";

export const checkCoverLatter = async (page: Page) => {
	const coverLetterText = await page.$(process.env.COVER_LATTER_CLASS_TEXT);
	return !!coverLetterText;
};
