import { pgTable, text, pgEnum, integer } from 'drizzle-orm/pg-core';

export const teaLeafType = pgEnum('waterSize', ['green', 'black', 'earl grey']);
export const tealeaf = pgTable('tealeaf', {
  id: text('id').notNull().primaryKey(),
  name: text('name').unique().notNull(),
  suggestedAmount: integer('suggested_amount').notNull(),
  steepingTime: integer('steeping_time').notNull(),
  waterTemperature: integer('water_temperature').notNull(),
  type: teaLeafType('type').notNull(),
});
