/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('organizations', (table) => {
    table.renameColumn('owner', 'owner_id');
    table.setNullable('contacts');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('organizations', (table) => {
    table.renameColumn('owner_id', 'owner');
    table.dropNullable('contacts');
  });
};
