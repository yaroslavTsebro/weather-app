import { Inject } from '@nestjs/common';
import { User } from 'src/shared/entities/user';
import { DataSource } from 'typeorm';
import { Dao } from './abstract.dao';

export class UserDao extends Dao<User> {
  constructor(@Inject(DataSource) dataSource: DataSource) {
    super(User, dataSource);
  }
}
