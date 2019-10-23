import { User } from '@modules/users';

/**
 * Интерфейс описывает клиента для пользователя
 */
export interface Client {
  /**
   * Уникальный идентификатор клиента
   */
  id?: string;
  /**
   * Объект пользователя, которому принадлежит клиент
   */
  user?: User;
  /**
   * Идентификатор пользователя, которому принадлежит клиент
   */
  userId?: string;
  /**
   * IP-адрес с которого пользователь авторизовался и создал клиент
   */
  ip: string;
  /**
   * Операционная система с которой пользователь авторизовался и создал клиент
   */
  os: string;
  /**
   * Браузер система с которой пользователь авторизовался и создал клиент
   */
  browser: string;
  /**
   * Строка user-agenta при создании клиента
   */
  userAgent: string;
  /**
   * Токен обновления для клиента
   */
  refreshToken?: string;
  /**
   * Время жизни токена обновления
   */
  expireIn: Date;
  /**
   * Время создания клиента
   */
  createdAt?: number;
  /**
   * Время обновления клиента
   */
  updatedAt?: number;
}
