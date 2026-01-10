import { Module } from '@nestjs/common';
import { DbModule } from 'src/drizzle/db.module';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';

@Module({
  imports: [DbModule],
  providers: [UserRepository, UserService],
  exports: [UserService],
})
export class UserModule {}
