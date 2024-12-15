import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { UserDao } from 'src/modules/system/db/dao/user.dao';
import { UserRepository } from 'src/modules/system/db/repositories/user.repository';
import { User } from 'src/shared/entities/user';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let userDao: jest.Mocked<UserDao>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: UserDao,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    userDao = module.get(UserDao);
  });

  it('should find user by email', async () => {
    const email = faker.internet.email();
    const user = { id: faker.number.int(), email, authProvider: {} } as User;

    userDao.findOne.mockResolvedValue(user);

    expect(await userRepository.findByEmail(email)).toEqual(user);
    expect(userDao.findOne).toHaveBeenCalledWith({
      where: { email },
      relations: ['authProvider'],
    });
  });

  it('should find user by id', async () => {
    const id = faker.number.int();
    const user = { id, email: faker.internet.email(), authProvider: {} } as User;

    userDao.findOne.mockResolvedValue(user);

    expect(await userRepository.findById(id)).toEqual(user);
    expect(userDao.findOne).toHaveBeenCalledWith({
      where: { id },
      relations: ['authProvider'],
    });
  });

  it('should save a user', async () => {
    const user = { email: faker.internet.email(), authProvider: {} } as User;
    const savedUser = { ...user, id: faker.number.int() };

    userDao.create.mockReturnValue(user);
    userDao.save.mockResolvedValue(savedUser);

    expect(await userRepository.save(user)).toEqual(savedUser);
    expect(userDao.create).toHaveBeenCalledWith(user);
    expect(userDao.save).toHaveBeenCalledWith(user);
  });
});
