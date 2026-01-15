import { Injectable, Logger } from '@nestjs/common';
import { SessionRepository } from '../repositories/session.repository';
import { CreateSessionRequestDto } from '../dtos/requests/create-session.request.dto';
import { SessionResponseDto } from '../dtos/responses/session.response.dto';
import { TX } from 'src/drizzle/db.client';
import { PaginableRequestDto } from 'src/pagination/dtos/paginable.request.dto';
import { PageDto } from 'src/pagination/dtos/page.dto';
import { PaginationService } from 'src/pagination/services/pagination.service';
import { DashboardSessionResponseDto } from '../dtos/responses/dashboard-session.response.dto';

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);

  constructor(
    private readonly sessionRep: SessionRepository,
    private readonly paginationService: PaginationService,
  ) {}

  public async findAll(requestDto: PaginableRequestDto): Promise<PageDto<DashboardSessionResponseDto>> {
    const skip = this.paginationService.getSkip(requestDto);
    const limit = requestDto.limit ?? 10;

    const findAllPromise = this.sessionRep.findAll(skip, limit);
    const findTotalCountPromise = this.sessionRep.findTotalCount();
    const [sessions, totalCount] = await Promise.all([findAllPromise, findTotalCountPromise]);

    const dtos = sessions.map((session) => {
      const participants = session.participants.map((participant) => {
        return {
          id: participant.id,
          sessionId: participant.sessionId,
          role: participant.role,
          user: {
            id: participant.user.id,
            name: participant.user.name,
            email: participant.user.email,
          },
        };
      });

      return {
        id: session.id,
        startDate: session.startDate,
        title: session.title,
        maxPlayers: session.maxPlayers,
        participants,
      };
    });

    return this.paginationService.create(dtos, requestDto, totalCount);
  }

  public async findByIdLock(id: string, tx: TX): Promise<SessionResponseDto | null> {
    const session = await this.sessionRep.findByIdLock(id, tx);

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

  public async findById(id: string, tx?: TX): Promise<SessionResponseDto | null> {
    const session = await this.sessionRep.findById(id, tx);

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
