import { Injectable, Logger } from '@nestjs/common';
import { SessionRepository } from '../repositories/session.repository';
import { CreateSessionRequestDto } from '../dtos/requests/create-session.request.dto';
import { SessionResponseDto } from '../dtos/responses/session.response.dto';
import { TX } from 'src/drizzle/db.client';

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);

  constructor(private readonly sessionRep: SessionRepository) {}

  public async findById(id: string): Promise<SessionResponseDto | null> {
    const session = await this.sessionRep.findById(id);

    if (!session) {
      return null;
    }

    return {
      id: session.id,
      startDate: session.startDate,
      title: session.title,
      maxPlayers: session.maxPlayers,
    };
  }

  public async create(sessionDto: CreateSessionRequestDto, tx?: TX): Promise<SessionResponseDto> {
    const session = await this.sessionRep.create(sessionDto, tx);
    this.logger.log(`Session created, session: ${JSON.stringify(session)}`);

    return {
      id: session.id,
      startDate: session.startDate,
      title: session.title,
      maxPlayers: session.maxPlayers,
    };
  }
}
