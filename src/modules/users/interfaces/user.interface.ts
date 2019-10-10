import { SessionEntity } from '@modules/auth/sessions';

export interface User {
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  readonly password: string;
  verify: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
