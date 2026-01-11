import { Injectable } from '@nestjs/common';
import type { DB, TX } from 'src/drizzle/db.client';
import { InjectDb } from 'src/drizzle/db.provider';
import { CreateSessionRequestDto } from '../dtos/requests/create-session.request.dto';
import { sessionTable } from 'src/drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class SessionRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  public async create(createSession: CreateSessionRequestDto, tx?: TX) {
    const transaction = tx ?? this.db;
    const [session] = await transaction.insert(sessionTable).values(createSession).returning();

    return session;
  }

  public async findById(id: string) {
    const [session] = await this.db.select().from(sessionTable).where(eq(sessionTable.id, id));

    if (!session) {
      return null;
    }

    return session;
  }
}
