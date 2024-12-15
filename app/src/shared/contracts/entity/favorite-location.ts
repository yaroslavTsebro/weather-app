import { WeatherPart } from 'src/shared/entities/weather';
import { IUser } from './user';

export interface IFavoriteLocation{
  id: number;
  lat: number;
  lon: number;
  part: WeatherPart[];
  user: IUser;
}