import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { WeatherCleanupService } from './weather-cleanup.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [WeatherCleanupService, WeatherService],
  controllers: [WeatherController]
})
export class WeatherModule {}
