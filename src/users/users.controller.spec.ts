import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './users.controller';
import { Users } from './users.entity';
import { UserCreateDto } from './users.request.dto';
import { UsersService } from './users.service';
import * as faker from 'faker';
import axios from 'axios';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUserService = {
    createUser: jest.fn().mockImplementation((dto) => ({
      user_id: expect.any(Number),
      ...dto,
    })),
    updateUser: jest.fn().mockImplementation((user_id, dto) => ({
      user_id,
      ...dto,
    })),
    getUsers: jest.fn().mockImplementation(() => []),

    getUser: jest.fn().mockImplementation((user_id) => ({
      user_id: user_id,
      user_name: expect.any(String),
      user_email: expect.any(String),
      user_account: expect.any(String),
      user_password: expect.any(String),
      user_type: expect.any(String),
    })),

    deleteUser: jest.fn().mockImplementation((user_id) => {}),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should create a user', async () => {
    const dto: UserCreateDto = {
      user_name: faker.lorem.sentence(),
      user_email: faker.lorem.sentence(),
      user_account: faker.lorem.sentence(),
      user_password: faker.lorem.sentence(),
      user_type: faker.lorem.sentence(),
    };

    const createdUser: Users = {
      user_id: expect.any(Number),
      user_name: dto.user_name,
      user_email: dto.user_email,
      user_account: dto.user_account,
      user_password: dto.user_password,
      user_type: dto.user_type,
    };
    const result = await controller.createUser(dto);

    jest.mock('axios');

    expect(result).toEqual(createdUser);
    expect(mockUserService.createUser).toHaveBeenCalledWith(dto);
  });

  it('should get all users', async () => {
    const result = await controller.getUsers();

    expect(mockUserService.getUsers).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });

  it('should get a user', async () => {
    const id: number = expect.any(Number);

    const getUser: Users = {
      user_id: expect.any(Number),
      user_name: expect.any(String),
      user_email: expect.any(String),
      user_account: expect.any(String),
      user_password: expect.any(String),
      user_type: expect.any(String),
    };

    const result = await controller.getUser(id);
    expect(result).toEqual(getUser);
    expect(mockUserService.getUser).toHaveBeenCalledWith(id);
  });

  it('update user', async () => {
    const dto: UserCreateDto = {
      user_name: faker.lorem.sentence(),
      user_email: faker.lorem.sentence(),
      user_account: faker.lorem.sentence(),
      user_password: faker.lorem.sentence(),
      user_type: faker.lorem.sentence(),
    };

    const id: number = expect.any(Number);

    const updatedUser: Users = {
      user_id: expect.any(Number),
      user_name: dto.user_name,
      user_email: dto.user_email,
      user_account: dto.user_account,
      user_password: dto.user_password,
      user_type: dto.user_type,
    };

    const result = await controller.updateUser(id, dto);

    expect(result).toEqual(updatedUser);
    expect(mockUserService.updateUser).toHaveBeenCalledWith(id, dto);
  });

  it('should delete a user', async () => {
    const id: number = expect.any(Number);

    const result = await controller.deleteUser(id);

    expect(result).toEqual(undefined);
    expect(mockUserService.deleteUser).toHaveBeenCalledWith(id);
  });
});
