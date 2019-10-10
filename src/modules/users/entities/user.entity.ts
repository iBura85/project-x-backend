import {
  Entity,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { User } from '@modules/users/interfaces/user.interface';
import { SessionEntity } from '@modules/auth/sessions';

@Entity('users')
@Unique('Phone', ['phone'])
export class UsersEntity implements User {
  @PrimaryColumn({
    name: 'id',
    length: 80,
    nullable: false,
    default: () => 'gen_random_uuid()',
  })
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
  })
  password: string;

  @Column('boolean', {
    nullable: true,
  })
  verify: boolean;

  @OneToMany(() => SessionEntity, session => session.user, { cascade: true })
  sessions?: SessionEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
