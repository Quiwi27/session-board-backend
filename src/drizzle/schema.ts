import { relations } from 'drizzle-orm';
import { pgEnum, uniqueIndex } from 'drizzle-orm/pg-core';
import { pgTable, timestamp, uuid, varchar, integer } from 'drizzle-orm/pg-core';

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

export const roleEnums = pgEnum('participant_roles', ['PLAYER', 'MASTER']);

export const sessionTable = pgTable('sessions', {
  id: uuid().primaryKey().defaultRandom(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  title: varchar().notNull(),
  maxPlayers: integer('max_players'),
  startDate: timestamp('start_date').notNull(),
});

export const participantTable = pgTable(
  'participants',
  {
    id: uuid().primaryKey().defaultRandom(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    role: roleEnums().notNull(),
    sessionId: uuid('session_id')
      .notNull()
      .references(() => sessionTable.id),
    userId: uuid('user_id')
      .notNull()
      .references(() => userTable.id),
  },
  (t) => [uniqueIndex('uniq_participant').on(t.sessionId, t.userId)],
);

export const sessionRelations = relations(sessionTable, ({ many }) => ({
  participants: many(participantTable, {
    relationName: 'sessionParticipants',
  }),
}));

export const participantRelations = relations(participantTable, ({ one }) => ({
  session: one(sessionTable, {
    fields: [participantTable.sessionId],
    references: [sessionTable.id],
    relationName: 'sessionParticipants',
  }),
  user: one(userTable, {
    fields: [participantTable.userId],
    references: [userTable.id],
    relationName: 'userParticipants',
  }),
}));

export const userRelations = relations(userTable, ({ many }) => ({
  participants: many(participantTable, {
    relationName: 'userParticipants',
  }),
}));
