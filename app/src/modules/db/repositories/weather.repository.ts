import { Injectable } from '@nestjs/common';
import { WeatherDao } from '../dao/weather.dao';

@Injectable()
export class WeatherRepository {

  constructor(private readonly dao: WeatherDao) { }

  async findById(id: number) {
    return this.dao.findOneBy({ id })
  }
}