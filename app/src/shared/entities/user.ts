import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { AuthProvider } from './auth-provider';
import { IUser } from '../contracts/entity/user';

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
}