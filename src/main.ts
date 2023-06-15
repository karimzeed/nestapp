import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogsModule } from './logs/logs.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LogsModule(),
  });
  
  await app.listen(3000);
}
bootstrap();