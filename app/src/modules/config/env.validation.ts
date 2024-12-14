import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, validateSync, IsNumber } from 'class-validator';

export class EnvVariables {
  @IsNotEmpty()
  @IsString()
  PORT: string;

  @IsNotEmpty()
  @IsNumber()
  HOST: number;

  @IsNotEmpty()
  @IsString()
  DB_NAME: string;

  @IsNotEmpty()
  @IsString()
  DB_USER: string;

  @IsNotEmpty()
  @IsString()
  DB_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  DB_HOST: string;

  @IsNotEmpty()
  @IsNumber()
  DB_PORT: number;

  @IsNotEmpty()
  @IsString()
  WEATHER_API_KEY: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(
      `Validation failed for environment variables: ${errors
        .map((err) => Object.values(err.constraints).join(', '))
        .join('; ')}`,
    );
  }

  return validatedConfig;
}