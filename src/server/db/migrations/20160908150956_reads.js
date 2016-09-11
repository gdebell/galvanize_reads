exports.up = function(knex, Promise) {
  return knex.schema.createTable('reads', function (table) {
    table.increments();
    table.string('title');
    table.string('genre');
    table.string('author');
    table.string('book_cover_url');
    table.string('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reads');
};
