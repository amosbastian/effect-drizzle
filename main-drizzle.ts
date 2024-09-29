import { Schema } from "@effect/schema";
import "dotenv/config";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import {  userTable } from "./schema";
import * as schema from "./schema/index";

async function main() {
  const client = new pg.Client({
    connectionString: process.env["DATABASE_URL"],
  });

  await client.connect();

  const db = drizzle(client, {
    schema,
    logger: process.env["NODE_ENV"] === "development",
  });

  const email = "johndoe@acme.com";
  await db.delete(userTable).where(eq(userTable.email, email));
  await db.insert(userTable).values({ email });
  const user = await db
    .select()
    .from(userTable)
    .then((rows) => rows.at(0));

  if (user) {
    console.log(typeof user.id, user.id);
    console.log(typeof user.createdAt, user.createdAt);
    console.log(typeof user.updatedAt, user.updatedAt);
    console.log(typeof user.deletedAt, user.deletedAt);
  }

  await client.end();
}

main();
