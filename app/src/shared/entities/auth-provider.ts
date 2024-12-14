import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user';
import { AuthProviderType, IAuthProvider } from '../contracts/entity/auth-provider';

@Entity()
export class AuthProvider implements IAuthProvider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: AuthProviderType })
  type: AuthProviderType;

  @Column()
  payload: string;

  @ManyToOne(() => User, (user) => user.authProvider)
  @JoinColumn()
  user: User;
}