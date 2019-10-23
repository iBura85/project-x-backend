import { UserRole } from '@modules/users';

export interface JwtPayload {
  userId: string;
  role: UserRole;
}
