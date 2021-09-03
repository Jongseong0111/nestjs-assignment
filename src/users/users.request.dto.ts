import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserType } from './users.entity';

export class UserCreateDto {
  @ApiProperty({ description: '유저 고유 id' })
  @IsNotEmpty()
  @IsNumber()
  user_id?: number;

  @ApiProperty({ description: '유저 이름' })
  @IsNotEmpty()
  @IsString()
  user_name: string;

  @ApiProperty({ description: '유저 이메일' })
  @IsNotEmpty()
  @IsString()
  user_email: string;

  @ApiProperty({ description: '유저 아이디' })
  @IsNotEmpty()
  @IsString()
  user_account: string;

  @ApiProperty({ description: '유저 비밀번호' })
  @IsNotEmpty()
  @IsString()
  user_password: string;

  @ApiProperty({ description: '유저 타입' })
  @IsNotEmpty()
  @IsString()
  user_type: UserType;
}
