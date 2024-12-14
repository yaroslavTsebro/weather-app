import { Injectable } from '@nestjs/common';
import { WeatherDao } from '../dao/weather.dao';
import { Weather } from 'src/shared/entities/weather';
import { LessThan } from 'typeorm';

@Injectable()
export class WeatherRepository {

  constructor(private readonly dao: WeatherDao) { }

  async findByCoordinates(lat: number, lon: number): Promise<Weather | null> {
    return this.dao.findOne({where: { lat, lon }});
  }

  async save(weather: Weather): Promise<Weather> {
    const weatherEnt = this.dao.create(weather);

    return this.dao.save(weatherEnt);
  }

  async deleteOlderThan(date: Date): Promise<number> {
    const result = await this.dao.delete({createdAt: LessThan(date)});

    return result.affected || 0;
  }
}