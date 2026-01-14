import { Module } from '@nestjs/common';
import { SessionRepository } from './repositories/session.repository';
import { SessionService } from './services/session.service';
import { ParticipantRepository } from './repositories/participant.repository';
import { ParticipantService } from './services/participant.service';
import { GameSessionService } from './services/game-session.service';
import { GameSessionConroller } from './controllers/game-session.controller';
import { DbModule } from 'src/drizzle/db.module';
import { PaginationModule } from 'src/pagination/pagination.module';

@Module({
  imports: [DbModule, PaginationModule],
  controllers: [GameSessionConroller],
  providers: [SessionRepository, ParticipantRepository, SessionService, ParticipantService, GameSessionService],
  exports: [SessionService],
})
export class SessionModule {}
