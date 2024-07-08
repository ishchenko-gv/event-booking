/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('sales', (table) => {
    table.bigIncrements();
    table.timestamps(true, true);
    table
      .bigint('owner')
      .references('id')
      .inTable('users')
      .onDelete('restrict')
      .notNullable();
    table
      .bigint('ticket')
      .references('id')
      .inTable('tickets')
      .onDelete('restrict')
      .notNullable();
    table.text('qr_code').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('sales');
};
