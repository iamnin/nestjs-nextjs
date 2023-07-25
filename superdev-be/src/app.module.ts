import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): any => ({
        type: configService.get<string>('SUPERDEV_DATABASE_TYPE'),
        host: configService.get<string>('SUPERDEV_DATABASE_HOST'),
        port: +configService.get<string>('SUPERDEV_DATABASE_PORT'),
        username: configService.get<string>('SUPERDEV_DATABASE_USERNAME'),
        password: configService.get<string>('SUPERDEV_DATABASE_PASSWORD'),
        database: configService.get<string>('SUPERDEV_DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
