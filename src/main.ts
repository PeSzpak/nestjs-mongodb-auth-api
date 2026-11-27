import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('NestJS MongoDB Auth API')
    .setDescription('Signup, signin with JWT and a protected user list')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  // UI at /docs, JSON spec at /docs-json
  SwaggerModule.setup('docs', app, () =>
    SwaggerModule.createDocument(app, config),
  );
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
