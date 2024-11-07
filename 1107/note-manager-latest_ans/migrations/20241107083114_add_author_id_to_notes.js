/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('notes', function (table) {
        // add col
        table.integer('author_id').unsigned();
        
        // add FK
        table
          .foreign('author_id')
          .references('authors.id')
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('notes', function (table) {
        // remove FK
        table.dropForeign('author_id')
        // drop col
        table.dropColumn('author_id')
    });
};
