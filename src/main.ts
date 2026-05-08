import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Crawller TCG API')
    .setDescription('API for scraping and managing TCG cards')
    .setVersion('1.0')
    .addTag('scraper', 'Scraping endpoints for TCG cards')
    .addTag('cards', 'Card CRUD operations')
    .addTag('scrape-errors', 'Error tracking for scraping operations')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`API running on http://localhost:${port}`);
  console.log(`Scraper endpoint: http://localhost:${port}/scraper/flesh-and-blood`);
  console.log(`Cards CRUD: http://localhost:${port}/cards`);
  console.log(`Swagger Docs: http://localhost:${port}/api/docs`);
}

bootstrap();