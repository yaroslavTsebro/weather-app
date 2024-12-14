import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { IsWeatherPart } from 'src/shared/decorators/validate-weather-part';

export class GetWeatherDto {
  @IsNumber()
  @Min(-90, { message: 'lat must be gte -90' })
  @Max(90, { message: 'lat must be lte 90' })
  lat: number;

  @IsNumber()
  @Min(-180, { message: 'lon must be gte -180' })
  @Max(180, { message: 'lon must be lte 180' })
  lon: number;

  @IsOptional()
  @IsWeatherPart()
  part?: string;
}
