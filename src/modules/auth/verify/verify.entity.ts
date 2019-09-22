import {
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryColumn,
  Entity,
} from 'typeorm';
import { Verify } from './verify.interface';

@Entity('verify-users')
export class VerifyEntity implements Verify {
  @PrimaryColumn('int')
  userId: number;

  @Column('int')
  code: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
