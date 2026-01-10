import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import type { DB } from 'src/drizzle/db.client';
import { InjectDb } from 'src/drizzle/db.provider';
import { userTable } from 'src/drizzle/schema';

@Injectable()
export class UserRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  public async findById(id: string) {
    const [user] = await this.db
      .select()
      .from(userTable)
      .where(eq(userTable.id, id));

    if (!user) {
      return null;
    }

    return user;
  }
}
