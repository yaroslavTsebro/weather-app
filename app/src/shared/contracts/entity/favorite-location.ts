import { WeatherPart } from 'src/shared/entities/weather';

export interface IFavoriteLocation{
  id: number;
  lat: number;
  lon: number;
  part: WeatherPart[];
}