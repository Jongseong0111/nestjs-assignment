import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserCreateDto } from './users.request.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @HttpCode(201)
  async createUser(@Body() userCreateDto: UserCreateDto) {
    return await this.userService.createUser(userCreateDto);
  }

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id', new ParseIntPipe()) id: number) {
    return await this.userService.getUser(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() userCreateDto: UserCreateDto,
  ) {
    return await this.userService.updateUser(id, userCreateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.deleteUser(id);
  }
}
