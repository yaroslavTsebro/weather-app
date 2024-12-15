import { Module } from '@nestjs/common';
import { FavoriteLocationController } from './favorite-location.controller';
import { FavoriteLocationService } from './favorite-location.service';
import { AuthModule } from '../auth/auth.module';
import { DbModule } from '../db/db.module';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, DbModule, UserModule, ConfigModule],
  controllers: [FavoriteLocationController],
  providers: [FavoriteLocationService]
})
export class FavoriteLocationModule {}
