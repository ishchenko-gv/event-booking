import _knex, { Knex } from 'knex';
import changeObjectCase from 'change-object-case';
import { Case } from 'change-case-all';

export let knex: Knex = null as unknown as Knex;

export async function connectDatabase() {
  knex = _knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    searchPath: ['public'],
    postProcessResponse: (result, queryContext) => {
      if (Array.isArray(result)) {
        return result.map((row) => changeObjectCase.camelKeys(row));
      } else {
        return changeObjectCase.camelKeys(result);
      }
    },
    wrapIdentifier: (value, origImpl, queryContext) => {
      if (value === '*') return value;
      return origImpl(Case.snake(value));
    },
  });
}
