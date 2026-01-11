import { Injectable } from '@nestjs/common';
import type { DB } from 'src/drizzle/db.client';
import { InjectDb } from 'src/drizzle/db.provider';
import { CreateSessionRequestDto } from '../dtos/requests/create-session.request.dto';
import { sessionTable } from 'src/drizzle/schema';

@Injectable()
export class SessionRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  public async create(createSession: CreateSessionRequestDto) {
    const [session] = await this.db.insert(sessionTable).values(createSession).returning();

    return session;
  }
}
