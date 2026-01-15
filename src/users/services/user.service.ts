import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserResponseDto } from '../dtos/user.response.dto';
import { UserAlreadyExistException } from '../exceptions/user-already-exist.exception';
import { DatabaseError } from 'pg';
import { UserFullResponseDto } from '../dtos/user-full.response.dto';
import { UserNotFoundException } from '../exceptions';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRep: UserRepository) {}

  public async findByEmail(email: string): Promise<UserFullResponseDto | null> {
    return this.userRep.findByEmail(email);
  }

  public async findById(id: string): Promise<UserResponseDto> {
    const user = await this.userRep.findById(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  public async create(createdDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const user = await this.userRep.create(createdDto);
      this.logger.log(`New user created, ${JSON.stringify({ id: user.id, email: user.email })}`);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    } catch (error) {
      const dbError = error as DatabaseError;

      if (dbError?.constraint === 'users_email_unique') {
        throw new UserAlreadyExistException();
      }

      throw error;
    }
  }
}
