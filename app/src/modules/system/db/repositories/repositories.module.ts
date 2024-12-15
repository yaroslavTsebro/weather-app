import { Global, Module } from '@nestjs/common';
import { WeatherRepository } from './weather.repository';
import { DbModule } from '../db.module';
import { UserRepository } from './user.repository';
import { AuthProviderRepository } from './auth-provider.repository';
import { FavoriteLocationRepository } from './favorite-location.repository';

const repositories = [
  WeatherRepository,
  UserRepository,
  AuthProviderRepository,
  FavoriteLocationRepository,
];

@Global()
@Module({
  imports: [DbModule],
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoriesModule { }
