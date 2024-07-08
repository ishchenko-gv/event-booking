/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('organizations', (table) => {
        table.bigIncrements()
        table.timestamps(true, true)
        table.string('name', 300).notNullable()
        table
            .bigint('owner')
            .references('id')
            .inTable('users')
            .onDelete('restrict')
            .notNullable()
        table.jsonb('contacts').notNullable()
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('organizations')
}
