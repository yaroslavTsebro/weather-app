import { Inject } from '@nestjs/common';
import { User } from 'src/shared/entities/user';
import { Dao } from './abstract.dao';
import { DbClient } from '../db-client.service';

export class UserDao extends Dao<User> {
  constructor(@Inject(DbClient) dataSource: DbClient) {
    super(User, dataSource);
  }
}
