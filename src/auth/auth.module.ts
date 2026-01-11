import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { HashService } from './services/hash.service';
import { UserModule } from 'src/users/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

const globalGuards = [{ provide: APP_GUARD, useClass: JwtAuthGuard }];

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [AuthService, HashService, JwtStrategy, ...globalGuards],
  exports: [],
})
export class AuthModule {}
