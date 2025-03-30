import { Injectable } from "@nestjs/common";
import puppeteer from "puppeteer";

@Injectable()
export class PuppeteerService {
	public async getPuppeteerInstance() {
		return await puppeteer.launch({ headless: false });
	}
}
