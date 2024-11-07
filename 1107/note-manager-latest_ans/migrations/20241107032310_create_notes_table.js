/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  // Create table notes
  return knex.schema.createTable("notes", (table)=>{
    table.increments("id").primary()
    table.text("title", 128).notNullable()
    table.text("content", 1024)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("notes")
};
