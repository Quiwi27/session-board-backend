import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserResponseDto } from '../dtos/user.response.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRep: UserRepository) {}

  public async create(createdDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userRep.create(createdDto);
    this.logger.log(`New user created, ${JSON.stringify({ id: user.id, email: user.email })}`);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
