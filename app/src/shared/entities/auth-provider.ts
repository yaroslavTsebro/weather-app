import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
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

  @OneToOne(() => User, (user) => user.authProvider)
  user: User;
}