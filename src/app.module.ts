import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './sessions/session.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/global.exception-filter';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, SessionModule],
  controllers: [],
  providers: [{ provide: APP_FILTER, useClass: GlobalExceptionFilter }],
})
export class AppModule {}
