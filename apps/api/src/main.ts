import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // ─── Global settings ───
  app.setGlobalPrefix('api'); // all routes become /api/*
  app.enableCors({
    origin: [
      'http://localhost:3000', // local frontend
      'https://being-og-web.vercel.app', // deployed frontend
    ],
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip properties not in DTOs
      forbidNonWhitelisted: true, // throw on extra properties
      transform: true, // auto-transform payloads to DTO instances
    }),
  );

  // ─── Port ───
  const port = process.env.PORT ?? 4000;
  await app.listen(port);

  logger.log(`🚀 BeingOG API running on http://localhost:${port}/api`);
}
bootstrap();
