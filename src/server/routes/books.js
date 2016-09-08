const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');
const genres = require('../genres');
const knex = require('../db/knex');

function Books() {return knex('reads'); }

router.get('/', (req, res, next) => {
  res.render('books/index', {title: 'Books'});
});

router.get('/new', (req, res, next) => {
  res.render('books/new', {title: 'New Book', genres: genres});
});

router.post('/', (req, res, next) => {
  let newBook = {
    title: req.body.title,
    genre: req.body.genre,
    book_cover_url: req.body.book_cover_url,
    description: req.body.description
  };
  new Books().insert(newBook)
  .then(() => {
    res.redirect('/books');
  });
});

module.exports = router;
