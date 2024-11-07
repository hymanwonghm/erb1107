/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('notes', function (table) {
        table.datetime("created_at")
        table.datetime("updated_at")
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('notes', function (table) {
        table.dropColumn("created_at")
        table.dropColumn("updated_at")
    });
};
