import { Users } from './users.entity';
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
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserCreateDto } from './users.request.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Account API')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: '유저 생성 API' })
  @ApiCreatedResponse({
    description: '유저의 정보를 받아 생성합니다.',
    type: Users,
  })
  async createUser(@Body() userCreateDto: UserCreateDto) {
    return await this.userService.createUser(userCreateDto);
  }

  @Get()
  @ApiOperation({ summary: '모든 유저 조회API' })
  @ApiOkResponse({ description: '모든 유저의 정보를 조회합니다.', type: Users })
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: '유저 정보 API' })
  @ApiOkResponse({
    description: '특정 Id의 유저를 조회합니다.',
    type: UserCreateDto,
  })
  async getUser(@Param('id', new ParseIntPipe()) id: number) {
    return await this.userService.getUser(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '유저 정보 수정 API' })
  @ApiOkResponse({ description: '특정 Id의 정보를 수정합니다.', type: Users })
  async updateUser(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() userCreateDto: UserCreateDto,
  ) {
    return await this.userService.updateUser(id, userCreateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '유저 삭제 API' })
  @ApiNoContentResponse({ description: '유저의 정보를 삭제합니다.' })
  @HttpCode(204)
  async deleteUser(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.deleteUser(id);
  }
}
