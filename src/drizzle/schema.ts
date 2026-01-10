import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const userTable = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar().notNull(),
  email: varchar().notNull(),
});
