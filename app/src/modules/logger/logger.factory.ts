import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';

export async function createWinstonOptions(): Promise<WinstonModuleOptions> {

  const loggerFormat = ({ level, message, timestamp }: winston.Logform.TransformableInfo) => (`[${timestamp}] ${level.toUpperCase()}: ${message}`);

  return {
    transports: [
      new winston.transports.Console({
        level: 'error',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.printf(loggerFormat),
        ),
      }),
    ],
  };
}
