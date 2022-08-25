import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3030;
  app.enableCors();
  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
