/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    // Create table authors
    return knex.schema.createTable("authors", (table)=>{
        table.increments("id").primary()
        table.text("name", 128).notNullable()
        table.datetime("created_at")
        table.datetime("updated_at")
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("authors")
};
