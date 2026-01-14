import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GameSessionService } from '../services/game-session.service';
import { CreateSessionOmitCreatorRequestDto, CreateSessionRequestDto } from '../dtos/requests/create-session.request.dto';
import { SessionResponseDto } from '../dtos/responses/session.response.dto';
import { GetDecodedUser } from 'src/auth/decorators/get-decoded-user.decorator';
import { DecodedJwtUserDto } from 'src/auth/dtos/decoded-jwt-user.dto';
import { ParticipantResponseDto } from '../dtos/responses/participant.reponse.dto';
import { ApiCookieAuth } from '@nestjs/swagger';
import { PaginableRequestDto } from 'src/pagination/dtos/paginable.request.dto';
import { PageDto } from 'src/pagination/dtos/page.dto';
import { DashboardSessionResponseDto } from '../dtos/responses/dashboard-session.response.dto';

@ApiCookieAuth()
@Controller({
  version: '1',
  path: 'game-sessions',
})
export class GameSessionConroller {
  constructor(private readonly gameSessionService: GameSessionService) {}

  @Get()
  public async findAll(@Query() paginableRequestDto: PaginableRequestDto): Promise<PageDto<DashboardSessionResponseDto>> {
    return this.gameSessionService.findAll(paginableRequestDto);
  }

  @Post()
  public async create(
    @Body() requestDto: CreateSessionOmitCreatorRequestDto,
    @GetDecodedUser() user: DecodedJwtUserDto,
  ): Promise<SessionResponseDto> {
    const createSessionDto: CreateSessionRequestDto = { ...requestDto, creatorId: user.userId };

    return this.gameSessionService.createSession(createSessionDto);
  }

  @Post(':sessionId/join')
  public join(@Param('sessionId') sessionId: string, @GetDecodedUser() user: DecodedJwtUserDto): Promise<ParticipantResponseDto> {
    return this.gameSessionService.joinSession(sessionId, user.userId);
  }
}
