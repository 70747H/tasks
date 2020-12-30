import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../config/config';
import { ApiConfigService } from '../config/config.service';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      load: [config],
      envFilePath: !ENV ? './env/.env' : `./env/.${ENV}.env`,
    }),
    // TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService]
    }),
    ApiConfigService,
    TasksModule,
    AuthModule],
  controllers: [],
  providers: [],
  exports: [ApiConfigService]
})
export class AppModule {}
