import { Module, OnModuleInit } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HHModule } from "./puppeteer/hh/hh.module";
import { HhService } from "./puppeteer/hh/hh.service";
import { PuppeteerModule } from "./puppeteer/puppeteer.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		HHModule,
		PuppeteerModule,
	],
	providers: [HhService],
})
export class AppModule implements OnModuleInit {
	constructor(private readonly hh: HhService) {}

	private companyMap = {
		HH: this.hh,
	};
	onModuleInit() {
		this.companyMap[process.env.WHICH_COMPANY_SCRAP_WITH_START].startScraping();
	}
}
