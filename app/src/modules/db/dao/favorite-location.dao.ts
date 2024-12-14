import { Inject } from '@nestjs/common';
import { FavoriteLocation } from 'src/shared/entities/favorite-location';
import { DataSource } from 'typeorm';
import { Dao } from './abstract.dao';

export class FavoriteLocationDao extends Dao<FavoriteLocation> {
  constructor(@Inject(DataSource) dataSource: DataSource) {
    super(FavoriteLocation, dataSource);
  }
}