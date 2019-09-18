import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '@modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { User } from '@modules/users/interfaces/user.interface';
import { AuthService } from '@modules/auth/auth.service';

@Injectable()
export class UsersSeeds {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepo: Repository<UsersEntity>,
    private readonly logger: Logger,
  ) {}

  /**
   * Запускает миграцию
   */
  public async run(): Promise<void> {
    try {
      this.logger.debug('Заполнение данных пользователей.');

      const usersList = await this.usersFactory();
      for (const user of usersList) {
        await this.userRepo
          .createQueryBuilder()
          .insert()
          .into(UsersEntity)
          .values(user)
          .onConflict(`("phone", "email") DO NOTHING`)
          .execute();
        // await this.userRepo.save(user);
      }

      this.logger.debug('Данные пользователей упешно заполнены.');
    } catch (err) {
      this.logger.error('Не удалось заполнить данные пользователей.');
      throw err;
    }
  }

  /**
   * Создает пользователей
   */
  private async usersFactory(): Promise<User[]> {
    try {
      return [
        {
          name: 'admin',
          phone: '+79990007777',
          email: 'admin@projectx.ru',
          password: await AuthService.hashPassword('admin', 10),
        },
      ] as User[];
    } catch (err) {
      this.logger.error('Не удалось создать пользователей.', err);
      throw err;
    }
  }
}
