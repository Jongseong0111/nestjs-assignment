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
  createUser(@Body() userCreateDto: UserCreateDto) {
    return this.userService.createUser(userCreateDto);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() userCreateDto: UserCreateDto) {
    return this.userService.updateUser(id, userCreateDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
