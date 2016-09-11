const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');
const genres = require('../genres');
const knex = require('../db/knex');

function knexAuthors() {return knex('writes'); }

router.get('/authors', (req, res, next) => {
  knexAuthors().select()
  .then(getAuthors => {
    res.render('authors/authors', {
      title: 'All Authors',
      writes: getAuthors
    });
  })
  .catch((err) => {
    return next (err);
  });
});


SELECT DISTINCT ON (students.id) first_name, last_name, students.id
FROM students INNER JOIN classes_students
ON students.id = classes_students.student_id ORDER BY first_name ASC;

// ** WORKING GET ROUTE ** //
// router.get('/authors', (req, res, next) => {
//   knexAuthors().select()
//   .then(getAuthors => {
//     res.render('authors/authors', {
//       title: 'All Authors',
//       writes: getAuthors
//     });
//   })
//   .catch((err) => {
//     return next (err);
//   });
// });


router.get('/authors/:id', (req, res, next) => {
  knexAuthors().where({id: req.params.id})
  .then(getAuthors => {
    res.render('authors/author', {
      title: 'One Author',
      writes: getAuthors
    });
  })
  .catch((err) => {
    return next (err);
  });
});

router.get('/new', (req, res, next) => {
  res.render('authors/new', {title: 'New Author'});
});

router.post('/', (req, res, next) => {
  let newAuthor = {
    name: req.body.name,
    bibliography: req.body.bibliography,
    portrait_url: req.body.portrait_url,
    books_name_and_id: req.body.books_name_and_id
  };
  knexAuthors().insert(newAuthor)
  .then(() => {
    res.redirect('/authors/authors');
  });
});

router.get('/authors/:id/delete', (req, res, next) => {
  knexAuthors().where({id: req.params.id})
  .then(getAuthor => {
    res.render('authors/delete', {
      title: 'Delete author',
      writes: getAuthor
    });
  })
  .catch((err) => {
    return next(err);
  });
});

router.delete('/authors/:id/delete', (req, res, next) => {
  const id = parseInt(req.params.id);
  knex('writes')
  .del()
  .where('id', id)
  .returning('*')
  .then ((results) => {
    console.log(results);
    if (results.length) {
      res.status(200).json({
        status: 'success',
        message: `${results[0].name} has been deleted.`
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'The author id you entered does not exist.'
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

router.get('/authors/:id/edit', (req, res, next) => {
  knexAuthors().where({id: req.params.id})
  .then(getAuthor => {
    console.log(getAuthor);
    res.render('authors/edit', {
      title: 'Edit author',
      write: getAuthor[0]
    });
  })
  .catch((err) => {
    return next(err);
  });
});

router.post('/:id/edit', (req, res, next) => {
  const id = parseInt(req.params.id);
  const updateName = req.body.name;
  const updateBibliography = req.body.bibliography;
  const updatePortrait_url = req.body.portrait_url;
  const updateBooks_name_and_id = req.body.books_name_and_id;

  knexAuthors()
  .update({
    name: updateName,
    bibliography: updateBibliography,
    portrait_url: updatePortrait_url,
    books_name_and_id: updateBooks_name_and_id
  })
  .where('id', id)
  .returning('*')
  .then ((results) => {
    res.redirect('/authors/authors');
  })
  .catch((err) => {
    res.status(500).json({
      status: 'error',
      message: 'An error has occured.'
    });
  });
});
module.exports = router;
