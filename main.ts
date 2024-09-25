import "dotenv/config";
import { Effect } from "effect";
import { DatabaseLive } from "./database";
import * as PgDrizzle from "@effect/sql-drizzle/Pg";
import { SelectUserSchema, userTable } from "./schema";
import { eq } from "drizzle-orm";
import { Schema } from "@effect/schema";

Effect.gen(function* () {
  const db = yield* PgDrizzle.PgDrizzle;
  const email = "johndoe@acme.com";
  yield* db.delete(userTable).where(eq(userTable.email, email));
  yield* db.insert(userTable).values({ email });
  const user = (yield* db.select().from(userTable)).at(0);

  if (user) {
    yield* Effect.log(typeof user.id, user.id);
    yield* Effect.log(typeof user.createdAt, user.createdAt);
    yield* Effect.log(typeof user.updatedAt, user.updatedAt);
    yield* Effect.log(typeof user.deletedAt, user.deletedAt);
    Schema.decodeUnknownSync(SelectUserSchema)(user);
  }
}).pipe(Effect.provide(DatabaseLive), Effect.runPromise);
