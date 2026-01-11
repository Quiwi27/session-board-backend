import { Injectable, Logger } from '@nestjs/common';
import { ParticipantRepository } from '../repositories/participant.repository';
import { CreateParticipantDto } from '../dtos/create-participant.dto';
import { ParticipantResponseDto } from '../dtos/responses/participant.reponse.dto';
import { TX } from 'src/drizzle/db.client';

@Injectable()
export class ParticipantService {
  private readonly logger = new Logger(ParticipantService.name);

  constructor(private readonly participanRep: ParticipantRepository) {}

  public async findByUserIdAndSessionId(userId: string, sessionId: string): Promise<ParticipantResponseDto | null> {
    const participant = await this.participanRep.findByUserIdAndSessionId(userId, sessionId);

    if (!participant) {
      return null;
    }

    return {
      id: participant.id,
      userId: participant.userId,
      sessionId: participant.sessionId,
      role: participant.role,
    };
  }

  public async findCountPlayersBySessionId(sessionId: string): Promise<{ count: number }> {
    const count = await this.participanRep.findCountBySessionIdAndRole(sessionId, 'PLAYER');

    return { count };
  }

  public async join(requestDto: CreateParticipantDto, tx?: TX): Promise<ParticipantResponseDto> {
    const participant = await this.participanRep.create(requestDto, tx);
    this.logger.log(`Join to session. Participant: ${JSON.stringify(participant)}`);

    return {
      id: participant.id,
      userId: participant.userId,
      sessionId: participant.sessionId,
      role: participant.role,
    };
  }
}
