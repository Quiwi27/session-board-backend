import { Body, Controller, Post } from '@nestjs/common';
import { SignUpRequestDto } from './dtos/sign-up.request.dto';
import { SignUpResponseDto } from './dtos/sign-up.response.dto';
import { AuthService } from './services/auth.service';
import { Public } from './decorators/public.decorator';
import { SignInRequestDto } from './dtos/sign-in.request.dto';
import { SignInResponseDto } from './dtos/sign-in.response.dto';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @Public()
  public async singIn(@Body() requestDto: SignInRequestDto): Promise<SignInResponseDto> {
    return this.authService.singIn(requestDto);
  }

  @Post('sign-up')
  @Public()
  public async signUp(@Body() requestDto: SignUpRequestDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(requestDto);
  }
}
