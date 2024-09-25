import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "../drizzle-schema";

export const userTable = pgTable(
  "user",
  {
    id: text("id")
      .primaryKey()
      .default(
        sql`${sql.raw(`'user_'`)} || replace(gen_random_uuid()::text, '-', '')`
      ),
    email: text("email").notNull(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "string",
    })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    deletedAt: timestamp("deleted_at", {
      withTimezone: true,
      mode: "string",
    }),
  },
  (t) => ({
    emailIdx: uniqueIndex("email_idx").on(sql`lower(${t.email})`),
  })
);

export const InsertUserSchema = createInsertSchema(userTable);
export const SelectUserSchema = createSelectSchema(userTable);
