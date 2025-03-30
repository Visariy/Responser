export const getAllVacancies = async (page): Promise<string[]> => {
	try {
		const selector = process.env.VACANCY_APPLY_BUTTON_CLASS;

		const transformedSelector = `a.${selector.split(" ").join(".")}`;

		await page.waitForSelector(transformedSelector, {
			timeout: 1000,
		});

		const button = await page.$(transformedSelector);
		if (!button) {
			throw new Error(
				"Button with env selector VACANCY_APPLY_BUTTON_CLASS not found."
			);
		}

		return await page.$$eval(
			transformedSelector,
			(vacancies: HTMLAnchorElement[]) => {
				return vacancies.map((vacancy) => vacancy.href);
			}
		);
	} catch (e) {
		throw new Error(e);
	}
};
