import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnvVariables } from 'src/shared/contracts/modules/config';
import { AuthProvider } from 'src/shared/entities/auth-provider';
import { FavoriteLocation } from 'src/shared/entities/favorite-location';
import { User } from 'src/shared/entities/user';
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
        User,
        AuthProvider,
        FavoriteLocation
      ],
      synchronize: true,
    } satisfies DataSourceOptions;

    super(options);

    this.initialize()
  }
}