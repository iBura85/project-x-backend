require('module-alias/register');

import { NestFactory } from '@nestjs/core';

import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';

// import * as useragent from 'express-useragent';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix('/v1/api');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
