import { Module } from '@nestjs/common';
import { FavoriteLocationController } from './favorite-location.controller';
import { FavoriteLocationService } from './favorite-location.service';
import { AuthModule } from '../auth/auth.module';
import { DbModule } from '../db/db.module';

@Module({
  imports: [AuthModule, DbModule],
  controllers: [FavoriteLocationController],
  providers: [FavoriteLocationService]
})
export class FavoriteLocationModule {}
