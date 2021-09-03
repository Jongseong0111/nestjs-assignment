import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type UserType = 'manufacturer' | 'genuio';

@Entity()
export class Users {
  @ApiProperty({ description: '유저 고유 id' })
  @PrimaryGeneratedColumn()
  user_id!: number;

  @ApiProperty({ description: '유저 이름' })
  @Column()
  user_name!: string;

  @ApiProperty({ description: '유저 이메일' })
  @Column()
  user_email!: string;

  @ApiProperty({ description: '유저 아이디' })
  @Column()
  user_account!: string;

  @ApiProperty({ description: '유저 비밀번호' })
  @Column()
  user_password!: string;

  @ApiProperty({ description: '유저 타입' })
  @Column({
    default: 'manufacturer',
    comment: 'genuio, manufacturer',
  })
  user_type: UserType;
}
