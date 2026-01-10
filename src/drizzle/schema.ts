import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const userTable = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: varchar().notNull(),
  email: varchar().notNull().unique(),
  password: varchar().notNull(),
});
