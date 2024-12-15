import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { PaginationQueryDto, PaginationResult } from 'src/shared/dto/pagination.dto';
import { FavoriteLocation } from 'src/shared/entities/favorite-location';
import { FavoriteLocationService } from './favorite-location.service';
import { AuthorizationGuard } from '../auth/guards/authorization.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from 'src/shared/entities/user';
import { CreateFavoriteLocationDto } from 'src/shared/dto/favorite/create';

@Controller('favorites')
export class FavoriteLocationController {
  constructor(private readonly service: FavoriteLocationService) {}

  @Post()
  @UseGuards(AuthorizationGuard)
  async addFavorite(
    @CurrentUser() user: User,
    @Body() body: CreateFavoriteLocationDto,
  ): Promise<FavoriteLocation> {
    return this.service.addFavorite(user.id, body);
  }


  @Get()
  @UseGuards(AuthorizationGuard)
  async getFavorites(
    @CurrentUser() user: User,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginationResult<FavoriteLocation>> {
    const { page, limit } = query;
    return this.service.getFavorites(user.id, page, limit);
  }


  @Delete(':id')
  @UseGuards(AuthorizationGuard)
  async removeFavorite(
    @CurrentUser() user: User,
    @Param('id') favoriteId: number,
  ): Promise<void> {
    await this.service.removeFavorite(user.id, favoriteId);
  }
}
