import { Injectable, Logger } from '@nestjs/common';
import { SessionService } from './session.service';
import { ParticipantService } from './participant.service';
import { CreateSessionRequestDto } from '../dtos/requests/create-session.request.dto';
import { CreateParticipantDto } from '../dtos/create-participant.dto';
import { SessionResponseDto } from '../dtos/responses/session.response.dto';
import { EnoughtCountPlayersException, SessionNotFoundException, UserAleadyJoinedSessionException } from '../exceptions';
import { ParticipantResponseDto } from '../dtos/responses/participant.reponse.dto';
import { InjectDb } from 'src/drizzle/db.provider';
import type { DB, TX } from 'src/drizzle/db.client';

@Injectable()
export class GameSessionService {
  private readonly logger = new Logger(GameSessionService.name);

  constructor(
    private readonly sessionService: SessionService,
    private readonly participantService: ParticipantService,
    @InjectDb() private readonly db: DB,
  ) {}

  public async createSession(sessionDto: CreateSessionRequestDto): Promise<SessionResponseDto> {
    return this.db.transaction(async (tx: TX) => {
      const session = await this.sessionService.create(sessionDto, tx);

      const participantJoin: CreateParticipantDto = {
        role: 'MASTER',
        sessionId: session.id,
        userId: sessionDto.creatorId,
      };

      await this.participantService.join(participantJoin, tx);

      return session;
    });
  }

  public async joinSession(sessionId: string, userId: string): Promise<ParticipantResponseDto> {
    const participantJoin: CreateParticipantDto = {
      role: 'PLAYER',
      sessionId,
      userId,
    };

    await this.validateJoin(sessionId, userId);

    return this.participantService.join(participantJoin);
  }

  private async validateJoin(sessionId: string, userId: string): Promise<void> {
    const session = await this.sessionService.findById(sessionId);

    if (!session) {
      const message = `Session not found, sessionId: ${sessionId}`;
      this.logger.warn(message);
      throw new SessionNotFoundException();
    }

    const participant = await this.participantService.findByUserIdAndSessionId(userId, sessionId);

    if (participant) {
      const message = `User already joined session, sessionId: ${sessionId}, userId: ${userId}`;
      this.logger.warn(message);
      throw new UserAleadyJoinedSessionException();
    }

    const { count: playerCount } = await this.participantService.findCountPlayersBySessionId(sessionId);

    if (session?.maxPlayers && playerCount >= session.maxPlayers) {
      const message = `Session is full, sessionId: ${sessionId}`;
      this.logger.warn(message);
      throw new EnoughtCountPlayersException();
    }
  }
}
