import { Body, Controller, Post } from '@nestjs/common';
import { GameSessionService } from '../services/game-session.service';
import { CreateSessionOmitCreatorRequestDto, CreateSessionRequestDto } from '../dtos/requests/create-session.request.dto';
import { SessionResponseDto } from '../dtos/responses/session.response.dto';
import { GetDecodedUser } from 'src/auth/decorators/get-decoded-user.decorator';
import { DecodedJwtUserDto } from 'src/auth/dtos/decoded-jwt-user.dto';

@Controller({
  version: '1',
  path: 'game-sessions',
})
export class GameSessionConroller {
  constructor(private readonly gameSessionService: GameSessionService) {}

  @Post()
  public async create(
    @Body() requestDto: CreateSessionOmitCreatorRequestDto,
    @GetDecodedUser() user: DecodedJwtUserDto,
  ): Promise<SessionResponseDto> {
    const createSessionDto: CreateSessionRequestDto = { ...requestDto, creatorId: user.userId };

    return this.gameSessionService.createSession(createSessionDto);
  }
}
