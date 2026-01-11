import { Injectable } from '@nestjs/common';
import type { DB } from 'src/drizzle/db.client';
import { InjectDb } from 'src/drizzle/db.provider';
import { CreateParticipantRequestDto } from '../dtos/create-participant.dto';
import { participantTable } from 'src/drizzle/schema';

@Injectable()
export class ParticipantRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  public async create(participantDto: CreateParticipantRequestDto) {
    const [participant] = await this.db.insert(participantTable).values(participantDto).returning();

    return participant;
  }
}
