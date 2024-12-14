import { IUser } from './user';

export enum AuthProviderType {
  EMAIL = 'EMAIL',
  GOOGLE = 'GOOGLE',
}

export interface IAuthProvider {
  id: number;
  type: AuthProviderType;
  payload: string;
  user: IUser;
}