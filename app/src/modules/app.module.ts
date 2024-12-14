import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { WeatherModule } from './weather/weather.module';
import { WeatherApiModule } from './weather-api/weather-api.module';
import { ConfigModule } from '@nestjs/config';
import { RepositoriesModule } from './db/repositories/repositories.module';

@Module({
  imports: [
    DbModule,
    WeatherModule,
    WeatherApiModule,
    ConfigModule,
    RepositoriesModule
  ]
})
export class AppModule { }
