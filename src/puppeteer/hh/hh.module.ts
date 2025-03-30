import { Module } from "@nestjs/common";
import { HhService } from "./hh.service";
import { PuppeteerModule } from "../puppeteer.module";
import { PuppeteerService } from "../puppeteer.service";

@Module({
	imports: [PuppeteerModule],
	providers: [HhService, PuppeteerService],
	exports: [HhService],
})
export class HHModule {}
