import { Injectable } from '@nestjs/common';
import { AuthProvider } from 'src/shared/entities/auth-provider';
import { AuthProviderDao } from '../dao/auth-provider.dao';
import { AuthProviderType } from 'src/shared/contracts/entity/auth-provider';

@Injectable()
export class AuthProviderRepository {
  constructor(private readonly dao: AuthProviderDao) { }

  async findByPayloadAndType(payload: string, type: AuthProviderType): Promise<AuthProvider | null> {
    return this.dao.findOne({
      where: { payload, type },
      relations: ['user'],
    });
  }

  async save(authProvider: AuthProvider): Promise<AuthProvider> {
    const authProviderEnt = this.dao.create(authProvider);
    return this.dao.save(authProviderEnt);
  }

  async deleteByUserId(userId: number): Promise<number> {
    const result = await this.dao.delete({ user: { id: userId } });
    return result.affected || 0;
  }
}
