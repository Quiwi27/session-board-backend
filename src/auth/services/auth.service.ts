import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/users/services/user.service';
import { SignUpRequestDto } from '../dtos/sign-up.request.dto';
import { SignUpResponseDto } from '../dtos/sign-up.response.dto';
import { HashService } from './hash.service';
import { UnableSignUpException } from '../exceptions/unable-sign-up.exception';
import { SignInRequestDto } from '../dtos/sign-in.request.dto';
import { SignInResponseDto } from '../dtos/sign-in.response.dto';
import { UnableSignInException } from '../exceptions/unable-sign-in.exception';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from '../dtos/jwt-payload.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  public async singIn(requestDto: SignInRequestDto): Promise<SignInResponseDto> {
    const user = await this.userService.findByEmail(requestDto.email);

    if (!user) {
      const message = `User with email ${requestDto.email} not found`;
      this.logger.warn(message);
      throw new UnableSignInException();
    }

    const isPasswordMatch = await this.hashService.comparePassword(requestDto.password, user.password);

    if (!isPasswordMatch) {
      const message = `User (${requestDto.email}) Password is not match`;
      this.logger.warn(message);
      throw new UnableSignInException();
    }

    const payload: JwtPayloadDto = { sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

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
