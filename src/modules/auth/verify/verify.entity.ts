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
  @PrimaryColumn()
  userId: string;

  @Column('int')
  code: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
