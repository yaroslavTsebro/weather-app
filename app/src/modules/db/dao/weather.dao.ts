import { Dao } from './abstract.dao';
import { DbClient } from '../db-client.service';
import { Inject } from '@nestjs/common';
import { Weather } from 'src/shared/entities/weather';

export class WeatherDao extends Dao<Weather> {
  constructor(@Inject(DbClient) dataSource: DbClient) {
    super(Weather, dataSource);
  }
}