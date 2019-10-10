import * as bcryptjs from 'bcryptjs';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoggerService } from '@commons/logger/logger.service';
import { Logger } from '@commons/logger/logger.decorator';
import { UsersService } from '@modules/users/users.service';
import { User } from '@modules/users/interfaces/user.interface';
import { UserAgent } from '@commons/user-agent';
import { LoginResult } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    @Logger('AuthService') private readonly logger: LoggerService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Возвращает хэш пароля
   * @param password
   * @param rounds
   */
  public static hashPassword(
    password: string,
    salt: number | string,
  ): Promise<string> {
    return bcryptjs.hash(password, salt);
  }

  /**
   * Сравнивает пароль пользователя и хэш полученный из БД
   */
  public static comparePassword(password: string, hash: string) {
    return bcryptjs.compare(password, hash);
  }

  /**
   * Валидация пользователя по логину и паролю
   * @param value значение логина
   * @param password пароль
   */
  async validateUser(value: string, password: string): Promise<User> {
    // определяет колонку в БД по которой производится поиск пользователя
    // поиск осуществялется по колонки email или phone
    const column: string = value.includes('@') ? 'email' : 'phone';

    try {
      // ищет пользователя в БД
      const user = await this.usersService.findOneBySpecifiedColumn(
        column,
        value,
      );

      // если найден пользователь
      if (user) {
        // проверка на соотвествие паролей
        const compareResult = await AuthService.comparePassword(
          password,
          user.password,
        );

        if (compareResult) {
          // если все проверки пройдены возвращает объект найденного пользователя
          return user;
        }
      }
    } catch (err) {
      this.logger.log(err.message);
      throw err;
    }

    return null;
  }

  /**
   * Создает клиента и генерирует JWT токен для пользователя
   * @param user
   */
  async login(user: User, userAgent: UserAgent): Promise<LoginResult> {
    // необходимо создать новую сессию для пользователя

    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
    return {
      access_token: this.jwtService.sign(payload),
    } as LoginResult;
  }
}
