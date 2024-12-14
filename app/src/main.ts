import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { IEnvVariables } from './shared/contracts/modules/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const configService = app.get(ConfigService<IEnvVariables>);
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  const PORT = configService.get<number>('PORT', 80);
  const HOST = configService.get<string>('HOST', '0.0.0.0');

  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  logger.log(`Application is running on: http://${HOST}:${PORT}`);
  await app.listen(PORT, HOST);
}
bootstrap();
