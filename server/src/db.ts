import knex from "knex";

export function connectDatabase() {
  knex({
    client: "pg",
    connection: process.env.DATABASE_URL,
    searchPath: ["public"],
  });
}
