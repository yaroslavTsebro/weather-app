import { IsNumber, IsArray, IsEnum, Max, Min } from 'class-validator';
import { WeatherPart } from 'src/shared/entities/weather';

export class CreateFavoriteLocationDto {
  @IsNumber()
  @Min(-90, { message: 'lat must be gte -90' })
  @Max(90, { message: 'lat must be lte 90' })
  lat: number;

  @IsNumber()
  @Min(-180, { message: 'lon must be gte -180' })
  @Max(180, { message: 'lon must be lte 180' })
  lon: number;

  @IsArray()
  @IsEnum(WeatherPart, { each: true })
  parts: WeatherPart[];
}