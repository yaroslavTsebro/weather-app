import { StartedPostgreSqlContainer, PostgreSqlContainer } from '@testcontainers/postgresql';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { UserDao } from 'src/modules/system/db/dao/user.dao';
import { User } from 'src/shared/entities/user';
import { DbClient } from 'src/modules/system/db/db-client.service';
import { AuthProvider } from 'src/shared/entities/auth-provider';
import { FavoriteLocation } from 'src/shared/entities/favorite-location';
import { Weather } from 'src/shared/entities/weather';

jest.setTimeout(30000); // just to wait for initialization
describe('UserDao', () => {
  let container: StartedPostgreSqlContainer;
  let dataSource: DataSource;
  let userDao: UserDao;

  beforeAll(async () => {
    container = await new PostgreSqlContainer().start();

    dataSource = new DataSource({
      type: 'postgres',
      host: container.getHost(),
      port: container.getPort(),
      username: container.getUsername(),
      password: container.getPassword(),
      database: container.getDatabase(),
      entities: [User, AuthProvider, FavoriteLocation, Weather],
      synchronize: true,
    });

    await dataSource.initialize();
    userDao = new UserDao(dataSource as DbClient);
  });

  afterAll(async () => {
    await dataSource.destroy();
    await container.stop();
  });

  it('should save and find a user', async () => {
    const email = faker.internet.email();
    const user = new User();
    user.email = email;

    const savedUser = await userDao.save(user);
    expect(savedUser.id).toBeDefined();

    const foundUser = await userDao.findOne({ where: { email: user.email } });
    expect(foundUser).toEqual(savedUser);
  });
});
