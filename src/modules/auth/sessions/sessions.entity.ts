import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { Session } from './sessions.interface';
import { UsersEntity } from '@modules/users/entities/user.entity';

@Entity('user-sessions')
export class SessionEntity implements Session {
  @PrimaryColumn({
    name: 'id',
    length: 80,
    nullable: false,
    default: () => 'gen_random_uuid()',
  })
  id: string;

  @ManyToOne(() => UsersEntity, user => user.sessions)
  @JoinColumn()
  user: UsersEntity;

  @RelationId((session: SessionEntity) => session.user)
  user_id: string;

  ip: string;
  os: string;
  browser: string;
  user_agent: string;
  token: string;
  expire_in: number;
  created_at: number;
  updated_at: number;
}
