import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { IWeather } from '../contracts/entity/weather';

@Entity()
export class Weather implements IWeather {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lat: number;

  @Column()
  lon: number;

  @Column({ nullable: true })
  part?: string;

  @Column({ type: 'jsonb' })
  data: any;
  
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}