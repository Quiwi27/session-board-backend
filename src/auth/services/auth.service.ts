import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/users/services/user.service';
import { SignUpRequestDto } from '../dtos/sign-up.request.dto';
import { SignUpResponseDto } from '../dtos/sign-up.response.dto';
import { HashService } from './hash.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
  ) {}

  public async signUp(requestDto: SignUpRequestDto): Promise<SignUpResponseDto> {
    const hashedPassword = await this.hashService.hashPassword(requestDto.password);
    const createdUser = await this.userService.create({ ...requestDto, password: hashedPassword });
    this.logger.log(`New user registered. ${JSON.stringify({ id: createdUser.id, email: createdUser.email })}`);

    return createdUser;
  }
}
