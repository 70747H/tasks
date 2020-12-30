import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ApiConfigService {
	constructor(private configService: ConfigService) { }

	get isDevelopment(): boolean {
		return this.configService.get('env') === 'development';
	}

	get isProduction(): boolean {
		return this.configService.get('env') === 'production';
	}
}