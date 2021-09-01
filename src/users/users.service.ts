import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { exists } from 'fs';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UserCreateDto } from './users.request.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async createUser(userCreateDto: UserCreateDto) {
    const result = await this.usersRepository.save(userCreateDto);
    return result;
  }

  async getUsers() {
    const result = await this.usersRepository.find();
    return result;
  }

  async updateUser(id: number, userCreateDto: UserCreateDto) {
    await this.usersRepository.update(id, userCreateDto);
    console.log(`Update User Id ${id}`);
    return this.usersRepository.findOne(id);
  }

  async deleteUser(id: number) {
    await this.usersRepository.delete(id);
    console.log(`Delete User Id ${id}`);
  }
}
