import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/users/services/user.service';
import { SignUpRequestDto } from '../dtos/sign-up.request.dto';
import { SignUpResponseDto } from '../dtos/sign-up.response.dto';
import { HashService } from './hash.service';
import { UnableSignUpException } from '../exceptions/unable-sign-up.exception';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
  ) {}

  public async signUp(requestDto: SignUpRequestDto): Promise<SignUpResponseDto> {
    const existUsers = await this.userService.findByEmail(requestDto.email);

    if (existUsers) {
      this.logger.warn(`User with email ${requestDto.email} already exist`);
      throw new UnableSignUpException();
    }

    try {
      const hashedPassword = await this.hashService.hashPassword(requestDto.password);
      const createdUser = await this.userService.create({ ...requestDto, password: hashedPassword });
      this.logger.log(`New user registered. ${JSON.stringify({ id: createdUser.id, email: createdUser.email })}`);

      return createdUser;
    } catch (error) {
      this.logger.warn(`Error: ${JSON.stringify(error)}`);

      throw new UnableSignUpException();
    }
  }
}
