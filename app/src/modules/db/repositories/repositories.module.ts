import { Global, Module } from '@nestjs/common';
import { WeatherRepository } from './weather.repository';
import { DbModule } from '../db.module';

const repositories = [
  WeatherRepository
];

@Global()
@Module({
  imports: [DbModule],
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoriesModule { }
