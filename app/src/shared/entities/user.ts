import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { AuthProvider } from './auth-provider';
import { IUser } from '../contracts/entity/user';
import { FavoriteLocation } from './favorite-location';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  name?: string;

  @OneToOne(() => AuthProvider, (authProvider) => authProvider.user, { cascade: true })
  @JoinColumn()
  authProvider: AuthProvider;

  @OneToMany(() => FavoriteLocation, (favoriteLocation) => favoriteLocation.user, { cascade: true })
  favoriteLocations: FavoriteLocation[];
}