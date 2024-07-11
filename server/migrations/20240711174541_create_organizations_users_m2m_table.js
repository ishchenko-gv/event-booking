/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('organizations_users_m2m', (table) => {
    table.timestamps(true, true);
    table.bigint('user_id').references('id').inTable('users').notNullable();
    table
      .bigint('organization_id')
      .references('id')
      .inTable('organizations')
      .notNullable();
    table.primary(['user_id', 'organization_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('organizations_users_m2m');
};
