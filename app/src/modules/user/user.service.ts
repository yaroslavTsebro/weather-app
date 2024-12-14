import { Injectable } from '@nestjs/common';
import { User } from 'src/shared/entities/user';
import { UserRepository } from '../db/repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}