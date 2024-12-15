import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { UserRepository } from 'src/modules/system/db/repositories/user.repository';
import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/shared/entities/user';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            findByEmail: jest.fn(),
            findById: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(UserRepository);
  });

  it('should find user by email', async () => {
    const email = faker.internet.email();
    const user = { id: faker.number.int(), email, authProvider: {} } as User;

    userRepository.findByEmail.mockResolvedValue(user);

    expect(await userService.findByEmail(email)).toEqual(user);
    expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
  });

  it('should find user by id', async () => {
    const id = faker.number.int();
    const user = { id, email: faker.internet.email(), authProvider: {} } as User;

    userRepository.findById.mockResolvedValue(user);

    expect(await userService.findById(id)).toEqual(user);
    expect(userRepository.findById).toHaveBeenCalledWith(id);
  });

  it('should create a user', async () => {
    const user = { email: faker.internet.email(), authProvider: {} } as User;
    const savedUser = { ...user, id: faker.number.int() };

    userRepository.save.mockResolvedValue(savedUser);

    expect(await userService.create(user)).toEqual(savedUser);
    expect(userRepository.save).toHaveBeenCalledWith(user);
  });
});
