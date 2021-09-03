import { NotFoundException } from '@nestjs/common';
import { UserCreateDto } from './users.request.dto';
import * as faker from 'faker';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { DeleteResult } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UserRepository],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<UserRepository>(UserRepository);
  });

  describe('create users', () => {
    it('create a user', async () => {
      const user_account = faker.lorem.sentence();
      const user_email = faker.lorem.sentence();
      const user_name = faker.lorem.sentence();
      const user_password = faker.lorem.sentence();
      const user_type = faker.lorem.sentence();

      const dto: UserCreateDto = {
        user_account: user_account,
        user_email: user_email,
        user_name: user_name,
        user_password: user_password,
        user_type: user_type,
      };

      const createdUser: Users = {
        user_id: faker.datatype.number(),
        user_account: user_account,
        user_email: user_email,
        user_name: user_name,
        user_password: user_password,
        user_type: user_type,
      };

      console.log(faker.lorem.sentence());
      const usersRepositoryCreateSpy = jest
        .spyOn(usersRepository, 'create')
        .mockReturnValue(createdUser);

      const usersRepositorySaveSpy = jest
        .spyOn(usersRepository, 'save')
        .mockResolvedValue(createdUser);

      const result = await service.createUser(dto);

      expect(usersRepositoryCreateSpy).toBeCalledWith(dto);
      expect(usersRepositorySaveSpy).toBeCalledWith(createdUser);
      expect(result).toEqual(createdUser);
    });
  });

  describe('get user list', () => {
    it('get all users', async () => {
      const users: Users[] = [
        {
          user_id: faker.datatype.number(),
          user_account: faker.lorem.sentence(),
          user_email: faker.lorem.sentence(),
          user_name: faker.lorem.sentence(),
          user_password: faker.lorem.sentence(),
          user_type: faker.lorem.sentence(),
        },
        {
          user_id: faker.datatype.number(),
          user_account: faker.lorem.sentence(),
          user_email: faker.lorem.sentence(),
          user_name: faker.lorem.sentence(),
          user_password: faker.lorem.sentence(),
          user_type: faker.lorem.sentence(),
        },
      ];

      const usersRepositoryFindSpy = jest
        .spyOn(usersRepository, 'find')
        .mockResolvedValue(users);

      const result = await service.getUsers();

      expect(usersRepositoryFindSpy).toBeCalled();
      expect(result).toBe(users);
    });
  });

  describe('get user information', () => {
    it('should fail on exception', async () => {
      const user_id = faker.datatype.number();

      const usersRepositoryFindOneSpy = jest
        .spyOn(usersRepository, 'findOne')
        .mockResolvedValue(undefined);

      try {
        await service.getUser(user_id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }

      expect(usersRepositoryFindOneSpy).toHaveBeenCalledWith(user_id);
    });

    it('get a user', async () => {
      const user_id = faker.datatype.number();

      const createdUser: Users = {
        user_id: user_id,
        user_account: faker.lorem.sentence(),
        user_email: faker.lorem.sentence(),
        user_name: faker.lorem.sentence(),
        user_password: faker.lorem.sentence(),
        user_type: faker.lorem.sentence(),
      };

      const usersRepositoryFindOneSpy = jest
        .spyOn(usersRepository, 'findOne')
        .mockResolvedValue(createdUser);

      const result = await service.getUser(user_id);

      expect(usersRepositoryFindOneSpy).toHaveBeenCalledWith(user_id);
      expect(result).toBe(createdUser);
    });
  });

  describe('update user information', () => {
    it('should fail on exception', async () => {
      const user_id = faker.datatype.number();

      const dto: UserCreateDto = {
        user_account: faker.lorem.sentence(),
        user_email: faker.lorem.sentence(),
        user_name: faker.lorem.sentence(),
        user_password: faker.lorem.sentence(),
        user_type: faker.lorem.sentence(),
      };

      const usersRepositoryFindOneSpy = jest
        .spyOn(usersRepository, 'findOne')
        .mockResolvedValue(undefined);

      try {
        await service.updateUser(user_id, dto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }

      expect(usersRepositoryFindOneSpy).toHaveBeenCalledWith(user_id);
    });

    it('update a user', async () => {
      const user_id = faker.datatype.number();

      const dto: UserCreateDto = {
        user_account: faker.lorem.sentence(),
        user_email: faker.lorem.sentence(),
        user_name: faker.lorem.sentence(),
        user_password: faker.lorem.sentence(),
        user_type: faker.lorem.sentence(),
      };

      const originalUser: Users = {
        user_id: user_id,
        user_account: faker.lorem.sentence(),
        user_email: faker.lorem.sentence(),
        user_name: faker.lorem.sentence(),
        user_password: faker.lorem.sentence(),
        user_type: faker.lorem.sentence(),
      };

      const updatedUser: Users = {
        user_id: user_id,
        ...dto,
      };

      const usersRepositoryFindOneSpy = jest
        .spyOn(usersRepository, 'findOne')
        .mockResolvedValue(originalUser);

      const usersRepositorySaveSpy = jest
        .spyOn(usersRepository, 'save')
        .mockResolvedValue(updatedUser);

      const result = await service.updateUser(user_id, dto);

      expect(usersRepositoryFindOneSpy).toHaveBeenCalledWith(user_id);

      expect(result).toBe(updatedUser);
    });
  });

  describe('delete user information', () => {
    it('should fail on exception', async () => {
      const user_id = faker.datatype.number();

      const usersRepositoryDeleteSpy = jest
        .spyOn(usersRepository, 'delete')
        .mockResolvedValue({} as DeleteResult);

      const result = await service.deleteUser(user_id);
      expect(usersRepositoryDeleteSpy).toHaveBeenCalledWith(user_id);
      expect(result).toBe(undefined);
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
