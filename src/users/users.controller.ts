import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UserCreateDto } from './users.request.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  async createUser(@Body() userCreateDto: UserCreateDto) {
    return await this.userService.createUser(userCreateDto);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return await this.userService.getUser(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() userCreateDto: UserCreateDto,
  ) {
    return await this.userService.updateUser(id, userCreateDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return await this.userService.deleteUser(id);
  }
}
