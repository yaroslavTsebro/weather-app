import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { IWeather } from '../contracts/entity/weather';

export enum WeatherPart {
  CURRENT = 'current',
  MINUTELY = 'minutely',
  HOURLY = 'hourly',
  DAILY = 'daily',
  ALERTS = 'alerts',
}

@Entity()
export class Weather implements IWeather {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lat: number;

  @Column()
  lon: number;

  @Column({ type: 'jsonb' })
  data: any;
  
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}