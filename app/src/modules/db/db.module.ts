import { Global, Module } from '@nestjs/common';
import { DbClient } from './db-client.service';
import { WeatherDao } from './dao/weather.dao';
import { ConfigModule } from '@nestjs/config';

const daos = [
  WeatherDao
];


@Global()
@Module({
  imports: [ConfigModule], 
  exports: [...daos],
  providers: [DbClient, ...daos]
})
export class DbModule {}
