import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';

import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../auth.service';
import { User } from '@modules/users/interfaces/user.interface';

/**
 * Локальная аутентификации стратегия для библиотеки PassportJS
 * В методе validate() производится проверка логина и пароля
 *
 * При успешной аутентификации пользователя в объект Request
 * добавляет свойсво user, содержащие данные пользователя
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * В конструкторе задаются параметры (options) для стратегии
   */
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'login',
    });
  }

  /**
   * Метод вызываемый PassportJS для валдидации пользователя
   */
  async validate(value: string, password: string): Promise<User> {
    // производит валидацию пользователя
    const user = await this.authService.validateUser(value, password);

    // если пользователь не прошел валидацию, выкидывает исключение
    if (!user) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    // возвращает объект пользователя
    return user;
  }
}
