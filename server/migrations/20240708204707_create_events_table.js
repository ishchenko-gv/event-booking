/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('events', (table) => {
    table.bigIncrements();
    table.timestamps(true, true);
    table.timestamp('start_date', { useTz: false }).notNullable();
    table.timestamp('end_date', { useTz: false }).notNullable();
    table.string('name', 300).notNullable();
    table.text('description');
    table.string('type', 100).notNullable();
    table
      .bigint('organization')
      .references('id')
      .inTable('organizations')
      .onDelete('restrict')
      .notNullable();
    table
      .bigint('venue')
      .references('id')
      .inTable('venues')
      .onDelete('restrict')
      .notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('events');
};
