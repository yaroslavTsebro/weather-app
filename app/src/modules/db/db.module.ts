import { Global, Module } from '@nestjs/common';
import { DbClient } from './db-client.service';
import { WeatherDao } from './dao/weather.dao';
import { ConfigModule } from '@nestjs/config';
import { AuthProviderDao } from './dao/auth-provider.dao';
import { UserDao } from './dao/user.dao';
import { FavoriteLocationDao } from './dao/favorite-location.dao';

const daos = [
  WeatherDao,
  AuthProviderDao,
  UserDao,
  FavoriteLocationDao
];


@Global()
@Module({
  imports: [ConfigModule], 
  exports: [...daos],
  providers: [DbClient, ...daos]
})
export class DbModule {}
