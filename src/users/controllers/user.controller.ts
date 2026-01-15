import { Controller, Get } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { GetDecodedUser } from 'src/auth/decorators/get-decoded-user.decorator';
import { DecodedJwtUserDto } from 'src/auth/dtos/decoded-jwt-user.dto';
import { UserResponseDto } from '../dtos/user.response.dto';

@ApiTags('Users')
@ApiCookieAuth()
@Controller({
  version: '1',
  path: 'users',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  public async getMe(@GetDecodedUser() user: DecodedJwtUserDto): Promise<UserResponseDto> {
    return this.userService.findById(user.userId);
  }
}
