
$(document).on('click', '.delete-book-btn', function() {
  const message = confirm('Are you sure you want to delete this book?');

  if (message) {
    const $this = $(this);
    const bookId = $this.attr('data-id');
    console.log(bookId);
    console.log('after book id');

    $.ajax({
      type: 'DELETE',
      url: `/books/books/${bookId}/delete`
    })
    .done((data) => {
      location.reload();
    })
    .fail((err) => {
      console.log('err!');
    });
  }
});

$(document).on('click', '.delete-author-btn', function() {
  const message = confirm('Are you sure you want to delete this author?');

  if (message) {
    const $this = $(this);
    const authorId = $this.attr('data-id');

    $.ajax({
      type: 'DELETE',
      url: `/authors/authors/${authorId}/delete`
    })
    .done((data) => {
      location.reload();
    })
    .fail((err) => {
      console.log('err!');
    });
  }
});
