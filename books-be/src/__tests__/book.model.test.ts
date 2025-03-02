import {
  getBooksCount,
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} from '../models/book.model';
import { dbPromise } from '../database/SQLite.database';
import { Database } from 'sqlite';

jest.mock('../database/SQLite.database', () => {
  const mockDb: Partial<Database> = {
    get: jest.fn(),
    all: jest.fn(),
    run: jest.fn(),
  };
  return { dbPromise: Promise.resolve(mockDb as Database) };
});

describe('Database functions', () => {
  let db: Database;

  beforeAll(async () => {
    db = await dbPromise;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getBooksCount should return correct count', async () => {
    (db.get as jest.Mock).mockResolvedValueOnce({ count: 10 });
    const count = await getBooksCount('test');
    expect(db.get).toHaveBeenCalledWith(
      'SELECT COUNT(*) as count FROM books WHERE title LIKE ? OR author LIKE ? OR isbn LIKE ?',
      ['%test%', '%test%', '%test%'],
    );
    expect(count).toBe(10);
  });

  test('getBooks should return list of books', async () => {
    const mockBooks = [{ id: 1, title: 'Book 1', author: 'Author 1', isbn: '123' }];
    (db.all as jest.Mock).mockResolvedValueOnce(mockBooks);
    const books = await getBooks('test', 1, 10);
    expect(db.all).toHaveBeenCalledWith(
      'SELECT * FROM books WHERE title LIKE ? OR author LIKE ? OR isbn LIKE ? LIMIT ? OFFSET ?',
      ['%test%', '%test%', '%test%', 10, 0],
    );
    expect(books).toEqual(mockBooks);
  });

  test('getBookById should return a book by id', async () => {
    const mockBook = { id: 1, title: 'Book 1', author: 'Author 1', isbn: '123' };
    (db.get as jest.Mock).mockResolvedValueOnce(mockBook);
    const book = await getBookById(1);
    expect(db.get).toHaveBeenCalledWith('SELECT * FROM books WHERE id = ?', [1]);
    expect(book).toEqual(mockBook);
  });

  test('addBook should insert a book and return it with an id', async () => {
    const newBook = { title: 'Book 1', author: 'Author 1', isbn: '123', image: 'url' };
    (db.run as jest.Mock).mockResolvedValueOnce({ lastID: 1 });
    const book = await addBook(newBook);
    expect(db.run).toHaveBeenCalledWith(
      'INSERT INTO books (title, author, isbn, image) VALUES (?, ?, ?, ?)',
      ['Book 1', 'Author 1', '123', 'url'],
    );
    expect(book).toEqual({ id: 1, ...newBook });
  });

  test('updateBook should return true if a book is updated', async () => {
    const book = {
      id: 1,
      title: 'Updated Title',
      author: 'Updated Author',
      isbn: '456',
      image: 'new-url',
    };
    (db.run as jest.Mock).mockResolvedValueOnce({ changes: 1 });
    const result = await updateBook(book);
    expect(db.run).toHaveBeenCalledWith(
      'UPDATE books SET title = ?, author = ?, isbn = ?, image = ? WHERE id = ?',
      ['Updated Title', 'Updated Author', '456', 'new-url', 1],
    );
    expect(result).toBe(true);
  });

  test('deleteBook should return true if a book is deleted', async () => {
    (db.run as jest.Mock).mockResolvedValueOnce({ changes: 1 });
    const result = await deleteBook(1);
    expect(db.run).toHaveBeenCalledWith('DELETE FROM books WHERE id = ?', [1]);
    expect(result).toBe(true);
  });
});
