/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('venues', (table) => {
    table
      .bigint('owner_id')
      .references('id')
      .inTable('users')
      .onDelete('restrict')
      .notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('venues', (table) => {
    table.dropColumn('owner_id');
  });
};
