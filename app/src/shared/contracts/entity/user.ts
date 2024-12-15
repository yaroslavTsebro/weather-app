import { IAuthProvider } from './auth-provider';
import { IFavoriteLocation } from './favorite-location';

export interface IUser {
  id: number;
  email: string;
  name?: string;
  authProvider: IAuthProvider;
  favoriteLocations: IFavoriteLocation[]
}