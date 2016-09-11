(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const books = require('../routes/books');
    const authors = require('../routes/authors');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/books', books);
    app.use('/authors', authors);

  };

})(module.exports);
