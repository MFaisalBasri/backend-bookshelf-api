const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
   
    const id = nanoid(16);
    const finished = readPage === pageCount ? true : false;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
   
    if(!name){
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    } else if(readPage > pageCount){
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }

    const newBook = {
      id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
    };
   
    books.push(newBook);
   
    const isSuccess = books.filter((book) => book.id === id).length > 0;
    
    if (isSuccess)  {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      });
      response.code(201);
      return response;
    }
  };

const getAllBooksHandler = () => {
  const filteredBooks = books.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  return {
    status: 'success',
    data: {
      books: filteredBooks,
    },
  };
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  
  const book = books.filter((n) => n.id === bookId)[0];
  
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  } else if(book === undefined){
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  } else if(book.finished === true){
      return {
        status: 'success',
        data: {
          book,
        },
      };
    } 
};
   
const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params; // Mendapatkan ID buku dari parameter URL

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload; // Mendapatkan data yang ingin diubah dari body permintaan

  // Cari indeks buku dengan ID yang sesuai
  const index = books.findIndex((book) => book.id === bookId);

  if(name === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  } else if(readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  } else if (index !== -1) {
    // Jika buku dengan ID yang sesuai ditemukan
    books[index] = {
      ...books[index], // Salin semua properti yang ada
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    };

    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
  } else {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);
  }
};
  
   
const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
   
  const index = books.findIndex((n) => n.id === bookId);
 
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
 
 const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
   
  module.exports = {
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookByIdHandler,
  };