import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WeatherRepository } from '../db/repositories/weather.repository';
@Injectable()
export class WeatherCleanupService {
  constructor(private readonly weatherRepository: WeatherRepository) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async removeOldWeatherData() {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    const deletedCount = await this.weatherRepository.deleteOlderThan(oneHourAgo);

    if (deletedCount > 0) {
      console.log(`[WeatherCleanup] Deleted ${deletedCount} old records.`);
    } else {
      console.log('[WeatherCleanup] No old records to delete.');
    }
  }
}
