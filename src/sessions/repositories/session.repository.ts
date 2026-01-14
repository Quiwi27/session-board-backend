import { Injectable } from '@nestjs/common';
import type { DB, TX } from 'src/drizzle/db.client';
import { InjectDb } from 'src/drizzle/db.provider';
import { CreateSessionRequestDto } from '../dtos/requests/create-session.request.dto';
import { sessionTable } from 'src/drizzle/schema';
import { count, desc, eq } from 'drizzle-orm';

@Injectable()
export class SessionRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  public async findAll(skip: number, limit: number) {
    const sessions = await this.db
      .select()
      .from(sessionTable)
      .offset(skip)
      .limit(limit)
      .orderBy(desc(sessionTable.createdAt), desc(sessionTable.startDate));

    return sessions;
  }

  public async findTotalCount() {
    const [result] = await this.db.select({ value: count() }).from(sessionTable);

    return result.value;
  }

  public async create(createSession: CreateSessionRequestDto, tx?: TX) {
    const transaction = tx ?? this.db;
    const [session] = await transaction.insert(sessionTable).values(createSession).returning();

    return session;
  }

  public async findById(id: string, tx?: TX) {
    const transaction = tx ?? this.db;
    const [session] = await transaction.select().from(sessionTable).where(eq(sessionTable.id, id));

    if (!session) {
      return null;
    }

    return session;
  }

  public async findByIdLock(id: string, tx: TX) {
    const [session] = await tx.select().from(sessionTable).where(eq(sessionTable.id, id)).for('update');

    if (!session) {
      return null;
    }

    return session;
  }
}
