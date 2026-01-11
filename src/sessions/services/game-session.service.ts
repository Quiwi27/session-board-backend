import { Injectable } from '@nestjs/common';
import { SessionService } from './session.service';
import { ParticipantService } from './participant.service';
import { CreateSessionRequestDto } from '../dtos/requests/create-session.request.dto';
import { CreateParticipantDto } from '../dtos/create-participant.dto';
import { SessionResponseDto } from '../dtos/responses/session.response.dto';

@Injectable()
export class GameSessionService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly participantService: ParticipantService,
  ) {}

  public async createSession(sessionDto: CreateSessionRequestDto): Promise<SessionResponseDto> {
    const session = await this.sessionService.create(sessionDto);

    const participantJoin: CreateParticipantDto = {
      role: 'MASTER',
      sessionId: session.id,
      userId: sessionDto.creatorId,
    };

    await this.participantService.join(participantJoin);

    return session;
  }
}
