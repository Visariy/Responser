import { Injectable } from "@nestjs/common";
import puppeteer from "puppeteer";

@Injectable()
export class PuppeteerService {
	public async getPuppeteerInstance() {
		console.log("Попал");
		return await puppeteer.launch({ headless: false });
	}
}
