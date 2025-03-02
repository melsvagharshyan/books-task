import { dbPromise } from '../database/SQLite.database';
import { TBook } from '../types/book.types';

export const getBooksCount = async (filter: string = '') => {
  const db = await dbPromise;

  let query = 'SELECT COUNT(*) as count FROM books';
  let params: (string | number)[] = [];

  if (filter) {
    query += ' WHERE title LIKE ? OR author LIKE ? OR isbn LIKE ?';
    params = [`%${filter}%`, `%${filter}%`, `%${filter}%`];
  }

  const result = await db.get(query, params);
  return result.count;
};

export const getBooks = async (filter: string = '', page: number, limit: number) => {
  const db = await dbPromise;
  const offset = (page - 1) * limit;

  let query = 'SELECT * FROM books';
  let params: (string | number)[] = [];

  if (filter) {
    query += ' WHERE title LIKE ? OR author LIKE ? OR isbn LIKE ?';
    params = [`%${filter}%`, `%${filter}%`, `%${filter}%`];
  }

  query += ' LIMIT ? OFFSET ?';
  params.push(limit, offset);

  return db.all(query, params);
};

export const getBookById = async (id: number) => {
  const db = await dbPromise;
  return db.get('SELECT * FROM books WHERE id = ?', [id]);
};

export const addBook = async (book: Omit<TBook, 'id'>) => {
  const db = await dbPromise;
  const result = await db.run(
    'INSERT INTO books (title, author, isbn, image) VALUES (?, ?, ?, ?)',
    [book.title, book.author, book.isbn, book.image],
  );
  return { id: result.lastID, ...book };
};

export const updateBook = async (book: TBook): Promise<boolean> => {
  const { title, author, isbn, image, id } = book;
  const db = await dbPromise;
  const result = await db.run(
    'UPDATE books SET title = ?, author = ?, isbn = ?, image = ? WHERE id = ?',
    [title, author, isbn, image, id],
  );
  return (result.changes ?? 0) > 0;
};

export const deleteBook = async (id: number) => {
  const db = await dbPromise;
  const result = await db.run('DELETE FROM books WHERE id = ?', [id]);
  return (result.changes ?? 0) > 0;
};
