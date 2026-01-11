import { Body, Controller, Post } from '@nestjs/common';
import { GameSessionService } from '../services/game-session.service';
import { CreateSessionRequestDto } from '../dtos/requests/create-session.request.dto';
import { SessionResponseDto } from '../dtos/responses/session.response.dto';

@Controller({
  version: '1',
  path: 'game-sessions',
})
export class GameSessionConroller {
  constructor(private readonly gameSessionService: GameSessionService) {}

  @Post()
  public async create(@Body() requestDto: CreateSessionRequestDto): Promise<SessionResponseDto> {
    return this.gameSessionService.createSession(requestDto);
  }
}
