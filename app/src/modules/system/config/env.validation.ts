import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, validateSync, IsNumber } from 'class-validator';
import { IEnvVariables } from 'src/shared/contracts/modules/config';

export class EnvVariables implements IEnvVariables {
  @IsNotEmpty()
  @IsNumber()
  PORT: number;

  @IsNotEmpty()
  @IsString()
  HOST: string;

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

  @IsNotEmpty()
  @IsString()
  GOOGLE_CLIENT_ID: string;

  @IsNotEmpty()
  @IsString()
  GOOGLE_CLIENT_SECRET: string;

  @IsNotEmpty()
  @IsString()
  GOOGLE_CLIENT_REDIRECT_URI: string;
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