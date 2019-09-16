import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { IUser } from '@modules/users/interfaces/user.interface';

@Entity('users')
export class UsersEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  phone: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;
}
