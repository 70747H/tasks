import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {SwaggerModule} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { QueryFailedExceptionFilter } from './filters/query-failed-exception.filter';
import { swaggerOptions } from './options/swagger.options';
import { classValidatorOptions } from './options/class-validator.options';
import { ApiConfigService } from '../config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const apiConfigService = app.get<ApiConfigService>(ApiConfigService);
  
  if(apiConfigService.isDevelopment)
    app.enableCors();

  const logger = new Logger();
  app.useGlobalPipes(new ValidationPipe(classValidatorOptions));
  app.useGlobalFilters(new (QueryFailedExceptionFilter));
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);  
  const port = configService.get('port');
  await app.listen(port);
  logger.log(`App is listening on port: ${port}.`);
  logger.log(configService.get('env'));
}
bootstrap();
