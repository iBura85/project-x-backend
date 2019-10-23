import {
  Entity,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '@modules/users/interfaces/user.interface';
import { ClientEntity } from '@modules/clients';
import { UserRole } from '../types/user-role.type';

@Entity('users')
@Unique('PhoneAndEmail', ['phone', 'email'])
export class UsersEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
    default: 'user',
  })
  role: UserRole;

  @Column('varchar', {
    nullable: true,
  })
  password: string;

  @Column('boolean', {
    nullable: true,
  })
  verify: boolean;

  @OneToMany(() => ClientEntity, session => session.user, { cascade: true })
  sessions?: ClientEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
