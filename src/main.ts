import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogsModule } from './logs/logs.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LogsModule(),
  });
  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();