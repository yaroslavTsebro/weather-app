import { Injectable } from '@nestjs/common';
import { FavoriteLocation } from 'src/shared/entities/favorite-location';
import { FavoriteLocationDao } from '../dao/favorite-location.dao';
import { CreateFavoriteLocationDto } from 'src/shared/dto/favorite/create';

@Injectable()
export class FavoriteLocationRepository {
  constructor(private readonly dao: FavoriteLocationDao) { }

  async addFavorite(dto: CreateFavoriteLocationDto, userId: number): Promise<FavoriteLocation> {
    return this.dao.create({
      lat: dto.lat,
      lon: dto.lon,
      part: dto.parts,
      user: { id: userId },
    });
  }

  async getFavoritesWithPagination(
    userId: number,
    page: number,
    limit: number,
  ): Promise<[FavoriteLocation[], number]> {
    const skip = (page - 1) * limit;

    return this.dao.findAndCount({
      where: { user: { id: userId } },
      skip,
      take: limit,
    });
  }

  async getFavoriteById(id: number, userId: number): Promise<FavoriteLocation | null> {
    return this.dao.findOne({ where: { id, user: { id: userId } } });
  }

  async delete(id: number): Promise<void> {
    await this.dao.delete({ id });
  }
}
