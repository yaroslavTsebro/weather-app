import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const configService = app.get(ConfigService);

  const PORT = configService.get<number>('PORT') || 3000;
  const HOST = configService.get<string>('HOST') || 'localhost';

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  console.log(`Application is running on: http://${HOST}:${PORT}`);
  await app.listen(PORT, HOST);
}
bootstrap();
