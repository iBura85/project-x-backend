import {
  Controller,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  Get,
  UsePipes,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@modules/users';
import { UserAgent, UserAgentInterceptor } from '@commons/user-agent';
import { AuthService } from './auth.service';
import { LoginResult, LoginRequest } from './interfaces';
import { UsersService } from '@modules/users/users.service';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { DeviceByIdPipe } from '@modules/devices/pipes/device-by-id.pipe';
import { DeviceOwnerPipe } from '@modules/devices/pipes/device-owner.pipe';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}
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
    // формирует объект запроса логина
    const loginRequest: LoginRequest = {
      user: req.user,
      userAgent: req.ua,
      ip: req.ip,
    };

    return this.authService.login(loginRequest);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async me(@Request() req) {
    const user: User = await this.usersService.findById(req.user.userId);
    return {
      email: user.email,
      phone: user.phone,
    };
  }

  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('admin')
  async admin(@Request() req) {
    return {};
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(DeviceByIdPipe)
  @Get('device/:device_id')
  async device(@Param('device') device: any) {
    return {};
  }
}
