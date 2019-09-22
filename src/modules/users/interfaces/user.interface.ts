export interface User {
  readonly id: number;
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  readonly password: string;
  verify: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
