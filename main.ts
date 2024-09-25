import { Schema } from "@effect/schema";
import * as PgDrizzle from "@effect/sql-drizzle/Pg";
import "dotenv/config";
import { eq } from "drizzle-orm";
import { Effect } from "effect";
import { DatabaseLive } from "./database";
import { SelectUserSchema, userTable } from "./schema";

Effect.gen(function* () {
  const db = yield* PgDrizzle.PgDrizzle;
  const email = "johndoe@acme.com";
  yield* db.delete(userTable).where(eq(userTable.email, email));
  yield* db.insert(userTable).values({ email });
  const user = (yield* db.select().from(userTable)).at(0);

  if (user) {
    console.log(typeof user.id, user.id);
    console.log(typeof user.createdAt, user.createdAt);
    console.log(typeof user.updatedAt, user.updatedAt);
    console.log(typeof user.deletedAt, user.deletedAt);
    Schema.decodeUnknownSync(SelectUserSchema)(user);
  }
}).pipe(Effect.provide(DatabaseLive), Effect.runPromise);
