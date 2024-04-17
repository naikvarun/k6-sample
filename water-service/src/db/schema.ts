import {
    pgTable,
    text,
   
    pgEnum,
  } from "drizzle-orm/pg-core";

  export const waterSize = pgEnum('waterSize', ['small', 'medium', 'large'])
  export const water = pgTable("water", {
    id: text("id").notNull().primaryKey(),
    amount: text('amount').notNull(),
    size: waterSize('size').notNull()
  });