import { IsDefined, IsMobilePhone, IsNumber } from 'class-validator';

export class InUsersVerifyDto {
  @IsDefined()
  @IsMobilePhone('ru-RU')
  phone: string;

  @IsDefined()
  @IsNumber()
  code: number;
}
