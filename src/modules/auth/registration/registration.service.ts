import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { TelegramService } from '@commons/telegram/telegram.service';
import { InUserRegistrationDto } from '@modules/users/dto/in-user-registration.dto';
import { VerifyService } from '@modules/auth/verify/verify.service';

import { UsersService } from '@modules/users/users.service';
import { UsersEntity } from '@modules/users/entities/user.entity';
import { User } from '@modules/users/interfaces/user.interface';
import { InUsersVerifyDto } from '../verify/dto/in-users-verify.dto';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly telegramService: TelegramService,
    private readonly verifyService: VerifyService,
  ) {}

  /**
   * Первый шаг регистрации
   * 1. Добавляет пользователя в БД (поле verify: false)
   * 2. Высылает проверочный код
   */
  public async firstStep(dto: InUserRegistrationDto) {
    let newUser: User = null;

    try {
      // создает объект пользователя из полученных данных
      const user: User = plainToClass(UsersEntity, dto);

      // устанавливает статус верификации false
      user.verify = false;

      // добавляем пользователя в БД
      newUser = await this.usersService.save(user);

      // генерирует код подтвержения
      const code = this.generateCode();

      // отправляем сообщение с кодом
      await this.telegramService.sendMessage(
        `Телефон: ${dto.phone} Код: ${code}`,
      );

      // добавляет объект верификации
      await this.verifyService.add(newUser.id, code);
    } catch (err) {
      // если ошибка возникла после создания пользователя
      if (newUser) {
        // удалем пользователя
        await this.usersService.remove(newUser);
      }
      return err;
    }
  }

  /**
   * Производит ферификацию пользователя по номеру телефона и коду проверки
   */
  public async verify(dto: InUsersVerifyDto) {
    return this.verifyService.do(dto);
  }

  private generateCode(): number {
    const val = Math.floor(1000 + Math.random() * 9000);

    return val;
  }
}
