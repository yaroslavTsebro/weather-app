import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnvVariables } from 'src/shared/contracts/modules/config';
import { Weather } from 'src/shared/entities/weather';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class DbClient extends DataSource {
  constructor(
    private readonly configService: ConfigService<IEnvVariables>
  ) {
    const options = {
      database: configService.get<string>('DB_NAME'),
      type: 'postgres',
      host: configService.get<string>('DB_HOST'),
      username: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASSWORD'),
      port: configService.get<number>('DB_PORT'),
      entities: [
        Weather,
      ],
      synchronize: true,
    } satisfies DataSourceOptions;

    super(options);

    this.initialize()
  }
}