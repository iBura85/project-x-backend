import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LoggerModule } from '@commons/logger/logger.module';
import { UsersModule } from '@modules/users/users.module';

import { ClientsModule } from '../clients';
import { LocalStrategy, JwtStrategy } from './strategies';

import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '360d' },
    }),
    UsersModule,
    PassportModule,
    LoggerModule.forRoot(),
    ClientsModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
