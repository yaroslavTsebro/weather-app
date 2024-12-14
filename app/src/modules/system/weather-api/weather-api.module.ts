import { Module } from '@nestjs/common';
import { WeatherApiService } from './weather-api.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { WEATHER_API_SERVICE } from 'src/shared/contracts/modules/weather-api';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [
    {
      provide: WEATHER_API_SERVICE,
      useClass: WeatherApiService
    }
  ],
  exports: [WEATHER_API_SERVICE]
})
export class WeatherApiModule { }
