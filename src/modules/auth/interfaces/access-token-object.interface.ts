/**
 * Описывает интерфейс объекта содержащий
 * токен доступа и его время действия
 */
export interface AccessTokenObject {
  access_token: string;
  expire_in: number;
}
