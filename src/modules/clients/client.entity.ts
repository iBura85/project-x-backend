import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  RelationId,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Generated,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from '@modules/users/entities/user.entity';

import { Client } from './client.interface';

@Entity('users-clients')
export class ClientEntity implements Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UsersEntity, user => user.sessions)
  @JoinColumn({ name: 'userId' })
  user: UsersEntity;

  @RelationId((session: ClientEntity) => session.user)
  userId: string;

  @Column('cidr')
  ip: string;

  @Column()
  os: string;

  @Column()
  browser: string;

  @Column()
  userAgent: string;

  @Generated('uuid')
  @Column('uuid')
  refreshToken: string;

  @Column({
    type: 'timestamp without time zone',
  })
  expireIn: Date;

  @CreateDateColumn({
    type: 'timestamp without time zone',
  })
  createdAt: number;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
  })
  updatedAt: number;
}
