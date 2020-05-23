import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureDocumentBuilder } from './api-doc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureDocumentBuilder(app);

  await app.listen(3000);
}
bootstrap();
