const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');
const genres = require('../genres');



router.get('/', (req, res, next) => {
  res.render('books/index', {title:'Books'});
});

router.get('/new', (req, res, next) => {
  res.render('books/new', {title: 'New Book', genres: genres});
});

module.exports = router;
