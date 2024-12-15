import { Inject } from '@nestjs/common';
import { FavoriteLocation } from 'src/shared/entities/favorite-location';
import { Dao } from './abstract.dao';
import { DbClient } from '../db-client.service';

export class FavoriteLocationDao extends Dao<FavoriteLocation> {
  constructor(@Inject(DbClient) dataSource: DbClient) {
    super(FavoriteLocation, dataSource);
  }
}