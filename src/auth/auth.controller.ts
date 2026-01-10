import { Body, Controller, Post } from '@nestjs/common';
import { SignUpRequestDto } from './dtos/sign-up.request.dto';
import { SignUpResponseDto } from './dtos/sign-up.response.dto';
import { AuthService } from './services/auth.service';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  public async signUp(@Body() requestDto: SignUpRequestDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(requestDto);
  }
}
