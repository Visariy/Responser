import { Injectable } from "@nestjs/common";
import { PuppeteerService } from "../puppeteer.service";
import * as cookie from "../../../hhCookie.json";
import { formatCookie } from "./utils/cookie.service";
import { addValueToSearchInput } from "./utils/searchValue.service";
import { clickSearchButton } from "./utils/searchButton.service";
import { getAllVacancies } from "./utils/getAllVacancies";
import { chooseCv } from "./utils/chooseCv.service";
import { applyOnVacancy } from "./utils/applyOnVacancy.service";
import { checkCoverLatter } from "./utils/checkCoverLatter";
@Injectable()
export class HhService {
	constructor(private puppeteer: PuppeteerService) {}

	private openedVacancyPage: boolean;

	public async hhStartScraping() {
		const browser = await this.puppeteer.getPuppeteerInstance();

		const page = await browser.newPage();

		await page.setViewport({ width: 1980, height: 1080 });

		await page.setCookie(...formatCookie(cookie));

		await page.goto(process.env.HH_BASE_URL, { timeout: 600000 });

		await addValueToSearchInput(page);

		await clickSearchButton(page);

		await page.waitForNavigation({ waitUntil: "load" });

		const allVacanciesOnPage = await getAllVacancies(page);

		const filteredVacanciesOnPage = new Set(allVacanciesOnPage);

		for (let i = 0; i < filteredVacanciesOnPage.size; i++) {
			try {
				if (!this.openedVacancyPage) {
					const arrayFilteredVacanciesOnPage = Array.from(
						filteredVacanciesOnPage
					);

					await page.goto(arrayFilteredVacanciesOnPage[i], {
						waitUntil: "load",
					});
					this.openedVacancyPage = true;
				}
			} catch (e) {
				console.error("cant go on vacancy href", e);
			}
			if (this.openedVacancyPage) {
				const preApplyQuestions = await page.$(
					`[${process.env.SELECTOR_PRE_APPLY_QUESTIONS}]`
				);
				if (preApplyQuestions) {
					await page.goBack();

					this.openedVacancyPage = false;
				} else {
					await page.waitForSelector(process.env.CV_RADIO_BUTTON_CLASS, {
						visible: true,
					});
					try {
						const cv = await page.$$(process.env.CV_RADIO_BUTTON_CLASS);
						await chooseCv(cv);
					} catch (e) {
						console.error("cant find cv button", e);
					}

					await applyOnVacancy(page);

					console.log("test", await checkCoverLatter(page));

					if (await checkCoverLatter(page)) {
						await page.type(
							process.env.COVER_LATTER_TEXT_AREA_CLASS,
							`${process.env.COVER_LATTER_TEXT?.replace(/\\n/g, "\n")}`
						);
						await applyOnVacancy(page);
					}

					await page.waitForNavigation({ waitUntil: "load" });

					await page.evaluate(() => window.history.go(-2));

					this.openedVacancyPage = false;
				}
			}
		}
	}

	public async startScraping() {
		await this.hhStartScraping();
	}
}
