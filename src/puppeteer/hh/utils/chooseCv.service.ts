import { ElementHandle } from "puppeteer";

export const chooseCv = async (cv: ElementHandle[]) => {
	try {
		const intCvIndex = parseInt(process.env.WHICH_CV_CHOOSE);
		if (intCvIndex >= cv.length) {
			throw new Error("cv index not exist");
		}
		await cv[intCvIndex].click();
	} catch (e) {
		console.error("cant click on cv button", e);
	}
};
