import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type UserType = 'manufacturer' | 'genuio';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column()
  user_name!: string;

  @Column()
  user_email!: string;

  @Column()
  user_account!: string;

  @Column()
  user_password!: string;

  @Column({
    default: 'manufacturer',
    comment: 'genuio, manufacturer',
  })
  user_type: UserType;
}
