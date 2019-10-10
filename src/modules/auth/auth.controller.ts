import {
  Controller,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@modules/users';
import { UserAgent, UserAgentInterceptor } from '@commons/user-agent';
import { AuthService } from './auth.service';
import { LoginResult } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /***
   * Маршрут для аутентификации пользователя
   * Применяется UserAgentInterceptor для внедрения в объект Request свойства ua ()
   * Используется GUARD библиотеки PassportJS с локальной стратегией
   * (проверка логина/телефона и пароля)
   */
  @UseInterceptors(UserAgentInterceptor)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req): Promise<LoginResult> {
    const user: User = req.user;
    const ua: UserAgent = req.ua;
    return this.authService.login(user, ua);
  }
  @Get('me')
  me(): string {
    return 'me';
  }
}
