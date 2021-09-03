import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { UsersController } from './users.controller';
import { Users } from './users.entity';
import { UserRepository } from './users.repository';
import { UserCreateDto } from './users.request.dto';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let repository: UserRepository;

  const mockUserService = {
    createUser: jest.fn((dto) => {
      return {
        user_id: expect.any(Number),
        ...dto,
      };
    }),
    updateUser: jest.fn().mockImplementation((user_id, dto) => ({
      user_id,
      ...dto,
    })),

    getUsers: jest.fn(() => [Users, Users]),

    getUser: jest.fn().mockImplementation((user_id) => ({
      user_id: user_id,
      user_name: expect.any(String),
      user_email: expect.any(String),
      user_account: expect.any(String),
      user_password: expect.any(String),
      user_type: expect.any(String),
    })),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, UserRepository],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto: UserCreateDto = {
      user_name: 'Leon',
      user_email: 'leon1111@naver.com',
      user_account: 'Leon',
      user_password: '1234',
      user_type: 'manufacturer',
    };

    expect(await controller.createUser(dto)).toEqual({
      user_id: expect.any(Number),
      user_name: dto.user_name,
      user_email: dto.user_email,
      user_account: dto.user_account,
      user_password: dto.user_password,
      user_type: dto.user_type,
    });

    expect(mockUserService.createUser).toHaveBeenCalledWith(dto);
  });

  it('should get all users', () => {
    expect(controller.getUsers()).toEqual([Users, Users]);
  });

  describe('get user', () => {
    it('should fail on exception', async () => {
      const foundUser: Users = {
        user_id: 1,
        user_name: 'Leon',
        user_email: 'leon1111@naver.com',
        user_account: 'Leon',
        user_password: '1234',
        user_type: 'manufacturer',
      };

      const id: number = 3;

      const userRepositorySpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(null);

      //Mock으로 catch로 넘어가야하는데.. 안넘어감
      try {
        await controller.getUser(id);
        console.log(4);
      } catch (error) {
        console.log(5);
        expect(error).toBeInstanceOf(NotFoundException);
      }

      expect(userRepositorySpy).toHaveBeenCalledWith(id);
      expect(mockUserService.getUser).toHaveBeenCalledWith(id);
    });
  });

  describe('update user', () => {
    const dto: UserCreateDto = {
      user_name: 'Leon11',
      user_email: 'leon1111@naver.com',
      user_account: 'Leon',
      user_password: '1234',
      user_type: 'manufacturer',
    };

    it('should fail on exception', async () => {
      const userRepositorySpy = jest
        .spyOn(new Repository(), 'findOne')
        .mockResolvedValue(undefined);

      const id: number = 2;

      try {
        await controller.updateUser(id, dto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }

      expect(mockUserService.updateUser).toHaveBeenCalledWith(id, dto);
    });

    it('should update a user', async () => {
      const foundUser: Users = {
        user_id: 1,
        user_name: 'Leon',
        user_email: 'leon1111@naver.com',
        user_account: 'Leon',
        user_password: '1234',
        user_type: 'manufacturer',
      };
      const getUser: Users = {
        user_id: 1,
        ...dto,
      };

      const user_id: number = 1;

      const userRepositorySpy = jest
        .spyOn(new Repository(), 'findOne')
        .mockResolvedValue(foundUser);

      const result = await controller.updateUser(user_id, dto);

      // expect(userRepositorySpy).toHaveBeenCalledWith();
      expect(result).toEqual(getUser);

      expect(mockUserService.updateUser).toHaveBeenCalledWith(user_id, dto);
    });
  });
});
