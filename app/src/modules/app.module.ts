import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { WeatherModule } from './weather/weather.module';
import { WeatherApiModule } from './system/weather-api/weather-api.module';
import { ConfigModule } from '@nestjs/config';
import { RepositoriesModule } from './db/repositories/repositories.module';
import { LoggerModule } from './system/logger/logger.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './system/jwt/jwt.module';
import { UserModule } from './user/user.module';
import { HashModule } from './system/hash/hash.module';
import { FavoriteLocationModule } from './favorite-location/favorite-location.module';

@Module({
  imports: [
    DbModule,
    WeatherModule,
    WeatherApiModule,
    ConfigModule,
    RepositoriesModule,
    LoggerModule,
    AuthModule,
    JwtModule,
    UserModule,
    HashModule,
    FavoriteLocationModule
  ]
})
export class AppModule { }
