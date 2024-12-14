import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { WeatherModule } from './weather/weather.module';
import { WeatherApiModule } from './weather-api/weather-api.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DbModule,
    WeatherModule,
    WeatherApiModule,
    ConfigModule
  ]
})
export class AppModule { }
