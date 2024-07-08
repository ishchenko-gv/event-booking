/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('venues', (table) => {
    table.bigIncrements();
    table.timestamps(true, true);
    table.string('name', 300).notNullable();
    table.decimal('location_lat', 7, 5).notNullable();
    table.decimal('location_long', 8, 5).notNullable();
    table.text('address').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('venues');
};
