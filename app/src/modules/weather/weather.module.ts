import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { WeatherCleanupService } from './weather-cleanup.service';
import { WeatherApiModule } from '../system/weather-api/weather-api.module';
import { DbModule } from '../system/db/db.module';

@Module({
  imports: [ScheduleModule.forRoot(), WeatherApiModule, DbModule],
  providers: [WeatherCleanupService, WeatherService],
  controllers: [WeatherController]
})
export class WeatherModule {}
