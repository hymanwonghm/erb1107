/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    // Create table "notes"
    return knex.schema.createTable("notes", (table)=>{
        table.increments("id").primary()
        table.text("title", 128).notNullable()
        table.text("content", 128)
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    }).then(() => {
        return knex.schema.createTable("authors", (table)=>{
            table.increments("id").primary()
            table.text("name", 128).notNullable()
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('modified_at').defaultTo(knex.fn.now())
        })
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  // Drop table 
    return knex.schema.dropTableIfExists("notes").then(() => {
        return knex.schema.dropTableIfExists("authors")
    })
};
