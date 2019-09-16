import * as bcryptjs from 'bcryptjs';

import { Injectable } from '@nestjs/common';

@Injectable()
export class Auth {
  /**
   * Возвращает хэш пароля
   * @param password
   * @param rounds
   */
  public static hashPassword(password: string, rounds: number) {
    return bcryptjs.hash(password, rounds);
  }
}
