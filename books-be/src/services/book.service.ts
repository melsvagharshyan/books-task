import {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
  getBookById,
  getBooksCount,
} from '../models/book.model';
import { TBook } from '../types/book.types';

export const listBooksService = async (filter: string, page: number, limit: number) => {
  const books = await getBooks(filter, page, limit);

  const totalBooks = await getBooksCount(filter);

  const totalPages = Math.ceil(totalBooks / limit);

  return {
    books,
    total: totalPages,
  };
};

export const getBookService = async (id: number) => {
  const book = await getBookById(id);
  return book;
};

export const createBookService = async (book: Omit<TBook, 'id'>) => {
  const newBook = await addBook(book);
  return newBook;
};

export const updateBookService = async (book: TBook) => {
  const success = await updateBook(book);
  return success;
};

export const deleteBookService = async (id: number) => {
  const success = await deleteBook(id);
  return success;
};
