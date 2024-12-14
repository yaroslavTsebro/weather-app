import { Inject } from '@nestjs/common';
import { AuthProvider } from 'src/shared/entities/auth-provider';
import { DataSource } from 'typeorm';
import { Dao } from './abstract.dao';

export class AuthProviderDao extends Dao<AuthProvider> {
  constructor(@Inject(DataSource) dataSource: DataSource) {
    super(AuthProvider, dataSource);
  }
}
