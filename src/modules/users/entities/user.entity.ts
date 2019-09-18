import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

import { User } from '@modules/users/interfaces/user.interface';

@Entity('users')
@Unique('PhoneAndEmail', ['phone', 'email'])
export class UsersEntity implements User {
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
