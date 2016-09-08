(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const books = require('../routes/books');
    // *** register routes *** //
    app.use('/', routes);
    app.use('/books', books);

  };

})(module.exports);
