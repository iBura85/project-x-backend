import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '@modules/users/interfaces/user.interface';

@Entity('users')
@Unique('Phone', ['phone'])
export class UsersEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    nullable: true,
  })
  name: string;

  @Column('varchar')
  phone: string;

  @Column('varchar', {
    nullable: true,
  })
  email: string;

  @Column('varchar', {
    nullable: true,
  })
  password: string;

  @Column('boolean', {
    nullable: true,
  })
  verify: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
