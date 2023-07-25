import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = new ConfigService();

  const PORT = configService.get<string>('SUPERDEV_DEVELOPMENT_PORT');

  await app.listen(PORT);
}
bootstrap();
