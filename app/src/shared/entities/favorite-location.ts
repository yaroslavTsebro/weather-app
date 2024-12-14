import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user';
import { WeatherPart } from './weather';
import { IFavoriteLocation } from '../contracts/entity/favorite-location';

@Entity()
export class FavoriteLocation implements IFavoriteLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lat: number;

  @Column()
  lon: number;

  @Column({ type: 'enum', enum: WeatherPart, array: true })
  part: WeatherPart[];

  @ManyToOne(() => User, (user) => user.favoriteLocations, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
