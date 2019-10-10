import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VerifyEntity } from './verify.entity';
import { Repository } from 'typeorm';
import { Verify } from './verify.interface';
import { InUsersVerifyDto } from './dto/in-users-verify.dto';
import { UsersService } from '@modules/users/users.service';

@Injectable()
export class VerifyService {
  constructor(
    @InjectRepository(VerifyEntity)
    private readonly verifyRepo: Repository<VerifyEntity>,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Добавляет объект верификации в БД
   * @param userId идентификатор пользователя
   * @param code код подверждения
   */
  add(userId: string, code: number): Promise<Verify> {
    const verifyObj: Verify = {
      userId,
      code,
    };
    return this.verifyRepo.save(verifyObj);
  }

  async do(dto: InUsersVerifyDto) {
    // получаем пользователя по номеру телефона
    const userObj = await this.usersService.findOneByPhone(dto.phone);

    if (!userObj) {
      throw new NotFoundException('Пользователь не найден');
    }

    // сверяем код подверждения
    const verifyObj = await this.verifyRepo.findOne(userObj.id);

    // если не найден объект подвердждения
    if (!verifyObj) {
      throw new NotFoundException(
        'Объект подтверждения для пользователя не найден',
      );
    }

    // если код подтверждения не верен
    if (verifyObj.code !== dto.code) {
      throw new BadRequestException('Не верный код подтверждения');
    }

    // удаляем объект подвтерждения и устанавливаем пользователя верефицированным
    await this.verifyRepo.remove(verifyObj);

    userObj.verify = true;

    await this.usersService.save(userObj);

    // здесь необходимо возвратить токен аторизации
    return userObj;
  }
}
