import { IsDefined, IsMobilePhone } from 'class-validator';

export class InUserRegistrationDto {
  @IsDefined()
  @IsMobilePhone('ru-RU')
  phone: string;
}
