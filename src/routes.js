const { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler} = require('./handler');

const routes = [
    {
      method: 'POST',
      path: '/books',
      handler: addBookHandler,
      options: {
        cors: {
          origin: ['*'],
        },
      },
    },
    {
      method: 'GET',
      path: '/books',
      handler: getAllBooksHandler
    },
    
    {
      method: 'GET',
      path: '/books/{bookId}',
      handler: getBookByIdHandler,
    },

    {
      method: 'PUT',
      path: '/books/{bookId}',
      handler: editBookByIdHandler,
    },

    {
      method: 'DELETE',
      path: '/books/{bookId}',
      handler: deleteBookByIdHandler,
    },
  ];
   
  module.exports = routes;