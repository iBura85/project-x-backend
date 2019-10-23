import * as bcryptjs from 'bcryptjs';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoggerService } from '@commons/logger/logger.service';
import { Logger } from '@commons/logger/logger.decorator';
import { UsersService } from '@modules/users/users.service';
import { User } from '@modules/users/interfaces/user.interface';
import { UserAgent } from '@commons/user-agent';
import { LoginResult, LoginRequest, AccessTokenObject } from './interfaces';
import { ClientsService } from '@modules/clients/clients.service';

@Injectable()
export class AuthService {
  constructor(
    @Logger('AuthService') private readonly logger: LoggerService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly clientsService: ClientsService,
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
  async login(loginRequest: LoginRequest): Promise<any> {
    try {
      const user = loginRequest.user;

      const accessTokenObject = this.generateAccessTokenObject(user);
      const refreshTokenObject = await this.clientsService.createClient(
        loginRequest,
      );

      const result: LoginResult = {
        ...accessTokenObject,
        refresh_token: refreshTokenObject.refreshToken,
      };

      console.log(result);

      return result;
    } catch (err) {
      throw err;
    }
  }

  private generateAccessTokenObject(user: User): AccessTokenObject {
    //
    const payload = {
      sub: user.id,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    const decodeToken = this.jwtService.decode(token);

    return {
      access_token: token,
      expire_in: decodeToken['exp'],
    };
  }
}
