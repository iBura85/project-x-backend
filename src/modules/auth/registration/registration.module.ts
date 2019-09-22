import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { UsersModule } from '@modules/users/users.module';
import { TelegramModule } from '@commons/telegram/telegram.module';
import { VerifyModule } from '../verify/verify.module';

@Module({
  imports: [UsersModule, TelegramModule, VerifyModule],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}
