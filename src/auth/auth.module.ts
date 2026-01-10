import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { HashService } from './services/hash.service';
import { UserModule } from 'src/users/user.module';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  imports: [UserModule],
  providers: [AuthService, HashService],
  exports: [],
})
export class AuthModule {}
