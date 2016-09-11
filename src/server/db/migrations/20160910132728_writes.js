exports.up = function(knex, Promise) {
  return knex.schema.createTable('writes', function (table) {
    table.increments();
    table.string('name');
    table.string('bibliography');
    table.string('portrait_url');
    table.string('books_name_and_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('writes');
};
