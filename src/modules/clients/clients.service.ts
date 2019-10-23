import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ClientEntity } from './client.entity';
import { Client } from './client.interface';
import { UserAgent } from '@commons/user-agent';
import { LoginRequest } from '@modules/auth/interfaces';
import { Inject } from '@nestjs/common';

export class ClientsService {
  constructor(
    /**
     * Период времени втечении которого действителен токен обновления
     */
    @Inject('REFRESH_TOKEN_EXPIRE_TIME')
    private readonly REFRESH_TOKEN_EXPIRE_TIME: number,
    @InjectRepository(ClientEntity)
    private readonly clientRepo: Repository<ClientEntity>,
  ) {}

  /**
   * Создает нового клиента для пользователя
   */
  async createClient(loginRequest: LoginRequest): Promise<Client> {
    // получает время действия токена обновления
    const expireIn: Date = new Date(
      new Date().getTime() + this.REFRESH_TOKEN_EXPIRE_TIME,
    );

    // формирует данные клиента
    const clientData: Client = {
      user: loginRequest.user,
      ip: loginRequest.ip,
      os: loginRequest.userAgent.os.name,
      browser: loginRequest.userAgent.browser.name,
      userAgent: loginRequest.userAgent.ua,
      expireIn,
    };

    // сохраняет клиента в БД и возвращает его
    return this.clientRepo.save(clientData);
  }
}
