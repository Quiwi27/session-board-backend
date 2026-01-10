import { Module } from '@nestjs/common';
import { DbModule } from 'src/drizzle/db.module';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [DbModule],
  providers: [UserRepository],
})
export class UserModule {}
