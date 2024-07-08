/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('tickets', (table) => {
    table.bigIncrements();
    table.timestamps(true, true);
    table.string('name', 300).notNullable();
    table
      .bigint('event')
      .references('id')
      .inTable('events')
      .onDelete('restrict')
      .notNullable();
    table.integer('total').unsigned().notNullable();
    table.integer('available').unsigned().notNullable();
    table.check('?? >= ??', ['total', 'available']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('tickets');
};
