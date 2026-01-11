import { Injectable, Logger } from '@nestjs/common';
import { ParticipantRepository } from '../repositories/participant.repository';
import { CreateParticipantDto } from '../dtos/create-participant.dto';
import { ParticipantResponseDto } from '../dtos/responses/participant.reponse.dto';

@Injectable()
export class ParticipantService {
  private readonly logger = new Logger(ParticipantService.name);

  constructor(private readonly participanRep: ParticipantRepository) { }

  public async join(requestDto: CreateParticipantDto): Promise<ParticipantResponseDto> {
    const participant = await this.participanRep.create(requestDto);
    this.logger.log(`Join to session. Participant: ${JSON.stringify(participant)}`);

    return {
      id: participant.id,
      userId: participant.userId,
      sessionId: participant.sessionId,
      role: participant.role,
    };
  }
}
