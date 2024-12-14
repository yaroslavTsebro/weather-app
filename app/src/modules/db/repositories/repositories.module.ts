import { Global, Module } from '@nestjs/common';
import { WeatherRepository } from './weather.repository';
import { DbModule } from '../db.module';
import { UserRepository } from './user.repository';
import { AuthProviderRepository } from './auth-provider.repository';

const repositories = [
  WeatherRepository,
  UserRepository,
  AuthProviderRepository
];

@Global()
@Module({
  imports: [DbModule],
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoriesModule { }
