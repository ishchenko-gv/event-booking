import _knex, { Knex } from 'knex';

export let knex: Knex = null as unknown as Knex;

export function connectDatabase() {
  knex = _knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    searchPath: ['public'],
  });
}
