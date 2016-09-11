const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');
const genres = require('../genres');
const knex = require('../db/knex');

function knexBooks() {return knex('reads'); }

router.get('/', (req, res, next) => {
  res.render('books/index', {title: 'Select Authors or Books'});
});

router.get('/books', (req, res, next) => {
  knexBooks().select()
  .then(getbooks => {
    res.render('books/books', {
      title: 'All Books',
      reads: getbooks
    });
  })
  .catch((err) => {
    return next (err);
  });
});

router.get('/books/:id', (req, res, next) => {
  knexBooks().where({id: req.params.id})
  .then(getbooks => {
    res.render('books/book', {
      title: 'One Book',
      reads: getbooks
    });
  })
  .catch((err) => {
    return next (err);
  });
});

router.get('/new', (req, res, next) => {
  res.render('books/new', {title: 'New Book', genres: genres});
});

router.post('/', (req, res, next) => {
  let newBook = {
    title: req.body.title,
    genre: req.body.genre,
    author: req.body.author,
    book_cover_url: req.body.book_cover_url,
    description: req.body.description
  };
  knexBooks().insert(newBook)
  .then(() => {
    res.redirect('/books/books');
  });
});

router.get('/books/:id/delete', (req, res, next) => {
  knexBooks().where({id: req.params.id})
  .then(getbook => {
    res.render('books/delete', {
      title: 'Delete book',
      reads: getbook
    });
  })
  .catch((err) => {
    return next(err);
  });
});

router.delete('/books/:id/delete', (req, res, next) => {
  const id = parseInt(req.params.id);
  knex('reads')
  .del()
  .where('id', id)
  .returning('*')
  .then ((results) => {
    console.log(results);
    if (results.length) {
      res.status(200).json({
        status: 'success',
        message: `${results[0].title} has been deleted.`
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'The book id you entered does not exist.'
      });
    }
  })
  .catch((err) => {
    res.status(500).json({
      status: 'error',
      message: 'An error has occured.'
    });
  });
});

router.get('/books/:id/edit', (req, res, next) => {
  knexBooks().where({id: req.params.id})
  .then(getbook => {
    console.log(getbook);
    res.render('books/edit', {
      title: 'Edit book',
      read: getbook[0]
    });
  })
  .catch((err) => {
    return next(err);
  });
});

router.post('/:id/edit', (req, res, next) => {
  const id = parseInt(req.params.id);
  const updateTitle = req.body.title;
  const updateGenre = req.body.genre;
  const updateAuthor = req.body.author;
  const updateBook_cover_url = req.body.book_cover_url;
  const updateDescription = req.body.description;

  knexBooks()
  .update({
    title: updateTitle,
    genre: updateGenre,
    author: updateAuthor,
    book_cover_url: updateBook_cover_url,
    description: updateDescription
  })
  .where('id', id)
  .returning('*')
  .then ((results) => {
    res.redirect('/books/books');
  })
  .catch((err) => {
    res.status(500).json({
      status: 'error',
      message: 'An error has occured!!!!'
    });
  });
});

module.exports = router;
