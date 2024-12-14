import { Injectable, NotFoundException } from '@nestjs/common';
import { FavoriteLocation } from 'src/shared/entities/favorite-location';
import { WeatherPart } from 'src/shared/entities/weather';
import { FavoriteLocationDao } from '../dao/favorite-location.dao';

@Injectable()
export class FavoriteLocationRepository {
  constructor(private readonly dao: FavoriteLocationDao) { }

  async addFavorite(lat: number, lon: number, parts: WeatherPart[], userId: number): Promise<FavoriteLocation> {
    return this.dao.create({
      lat,
      lon,
      part: parts,
      user: { id: userId },
    });
  }

  async getFavorites(userId: number): Promise<FavoriteLocation[]> {
    return this.dao.find({ where: { user: { id: userId } } });
  }

  async getFavoriteById(id: number, userId: number): Promise<FavoriteLocation | null> {
    return this.dao.findOne({ where: { id, user: { id: userId } } });
  }

  async delete(id: number): Promise<void> {
    await this.dao.delete({ id });
  }
}
