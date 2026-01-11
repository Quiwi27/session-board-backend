import { Injectable } from '@nestjs/common';
import type { DB } from 'src/drizzle/db.client';
import { InjectDb } from 'src/drizzle/db.provider';
import { CreateParticipantDto } from '../dtos/create-participant.dto';
import { participantTable } from 'src/drizzle/schema';
import { and, count, eq } from 'drizzle-orm';

@Injectable()
export class ParticipantRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  public async create(participantDto: CreateParticipantDto) {
    const [participant] = await this.db.insert(participantTable).values(participantDto).returning();

    return participant;
  }

  public async findByUserIdAndSessionId(userId: string, sessionId: string) {
    const participant = await this.db.query.participantTable.findFirst({
      where: and(eq(participantTable.userId, userId), eq(participantTable.sessionId, sessionId)),
    });

    if (!participant) {
      return null;
    }

    return participant;
  }

  public async findCountBySessionIdAndRole(sessionId: string, role: 'PLAYER' | 'MASTER'): Promise<number> {
    const [result] = await this.db
      .select({ value: count() })
      .from(participantTable)
      .where(and(eq(participantTable.sessionId, sessionId), eq(participantTable.role, role)));

    return result.value;
  }
}
