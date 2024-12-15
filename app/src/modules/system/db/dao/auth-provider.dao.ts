import { Inject } from '@nestjs/common';
import { AuthProvider } from 'src/shared/entities/auth-provider';
import { Dao } from './abstract.dao';
import { DbClient } from '../db-client.service';

export class AuthProviderDao extends Dao<AuthProvider> {
  constructor(@Inject(DbClient) dataSource: DbClient) {
    super(AuthProvider, dataSource);
  }
}
