import { UserRole } from '../types/user-role.type';

export interface User {
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  readonly password: string;
  readonly role: UserRole;
  verify: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
