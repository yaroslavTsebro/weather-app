import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationResult } from 'src/shared/dto/pagination.dto';
import { FavoriteLocation } from 'src/shared/entities/favorite-location';
import { FavoriteLocationRepository } from '../system/db/repositories/favorite-location.repository';
import { CreateFavoriteLocationDto } from 'src/shared/dto/favorite/create';


@Injectable()
export class FavoriteLocationService {
  constructor(private readonly repository: FavoriteLocationRepository) {}

  async addFavorite(userId: number, dto: CreateFavoriteLocationDto): Promise<FavoriteLocation> {
    return this.repository.addFavorite(dto, userId);
  }

  async getFavorites(
    userId: number,
    page: number,
    limit: number,
  ): Promise<PaginationResult<FavoriteLocation>> {
    const [data, total] = await this.repository.getFavoritesWithPagination(userId, page, limit);

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async removeFavorite(userId: number, favoriteId: number): Promise<void> {
    const entityToRemove = await this.repository.getFavoriteById(favoriteId, userId);

    if(!entityToRemove) throw new NotFoundException()

    await this.repository.delete(favoriteId);
  }
}
