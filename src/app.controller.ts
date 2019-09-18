import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
// import { AuthGuard } from '@commons/guards/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  //@UseGuards(AuthGuard)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req): Promise<any> {
    return req.user;
  }
}
