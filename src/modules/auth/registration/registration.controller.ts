import { Controller, Post, Body } from '@nestjs/common';
import { InUserRegistrationDto } from '@modules/users/dto/in-user-registration.dto';
import { RegistrationService } from './registration.service';
import { InUsersVerifyDto } from '../verify/dto/in-users-verify.dto';
import { User } from '@modules/users/interfaces/user.interface';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post('')
  async registration(@Body() dto: InUserRegistrationDto): Promise<void> {
    return this.registrationService.firstStep(dto);
  }

  @Post('verify')
  async verify(@Body() dto: InUsersVerifyDto): Promise<User> {
    return this.registrationService.verify(dto);
  }
}
