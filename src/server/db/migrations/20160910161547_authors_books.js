
exports.up = function(knex, Promise) {
  return knex.schema.createTable('joins', function (table) {
    table.integer('author_id').references('id').inTable('writes');
    table.integer('book_id').references('id').inTable('reads');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('joins');
};
