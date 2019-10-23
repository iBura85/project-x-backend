import { UserAgent } from '@commons/user-agent';
import { User } from '@modules/users';

export interface LoginRequest {
  user: User;
  userAgent: UserAgent;
  ip: string;
}
