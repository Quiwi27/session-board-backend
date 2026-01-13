import { Body, Controller, Post, Res } from '@nestjs/common';
import { SignUpRequestDto } from './dtos/sign-up.request.dto';
import { SignUpResponseDto } from './dtos/sign-up.response.dto';
import { AuthService } from './services/auth.service';
import { Public } from './decorators/public.decorator';
import { SignInRequestDto } from './dtos/sign-in.request.dto';
import { type Response } from 'express';
import { ApiCookieAuth } from '@nestjs/swagger';

@ApiCookieAuth()
@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @Public()
  public async singIn(@Body() requestDto: SignInRequestDto, @Res({ passthrough: true }) res: Response): Promise<void> {
    const { accessToken } = await this.authService.singIn(requestDto);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 86400000,
    });
  }

  @Post('sign-up')
  @Public()
  public async signUp(@Body() requestDto: SignUpRequestDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(requestDto);
  }
}
