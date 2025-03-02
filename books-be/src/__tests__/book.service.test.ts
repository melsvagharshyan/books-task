import {
  listBooksService,
  getBookService,
  createBookService,
  updateBookService,
  deleteBookService,
} from '../services/book.service';
import {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
  getBookById,
  getBooksCount,
} from '../models/book.model';
import { TBook } from '../types/book.types';

jest.mock('../models/book.model');

describe('Book Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('listBooksService', () => {
    it('should return a list of books and total pages', async () => {
      const mockBooks: TBook[] = [
        { id: 1, title: 'Test Book', author: 'Test Author', isbn: '123', image: 'image-url' },
      ];
      const mockTotalBooks = 10;
      const filter = 'test';
      const page = 1;
      const limit = 5;

      (getBooks as jest.Mock).mockResolvedValue(mockBooks);
      (getBooksCount as jest.Mock).mockResolvedValue(mockTotalBooks);

      const result = await listBooksService(filter, page, limit);

      expect(getBooks).toHaveBeenCalledWith(filter, page, limit);
      expect(getBooksCount).toHaveBeenCalledWith(filter);
      expect(result.books).toEqual(mockBooks);
      expect(result.total).toBe(2);
    });
  });

  describe('getBookService', () => {
    it('should return a single book', async () => {
      const mockBook: TBook = {
        id: 1,
        title: 'Test Book',
        author: 'Test Author',
        isbn: '123',
        image: 'image-url',
      };
      const bookId = 1;

      (getBookById as jest.Mock).mockResolvedValue(mockBook);

      const result = await getBookService(bookId);

      expect(getBookById).toHaveBeenCalledWith(bookId);
      expect(result).toEqual(mockBook);
    });
  });

  describe('createBookService', () => {
    it('should create a new book and return it', async () => {
      const mockBook: Omit<TBook, 'id'> = {
        title: 'New Book',
        author: 'New Author',
        isbn: '456',
        image: 'new-image-url',
      };
      const mockNewBook: TBook = { id: 1, ...mockBook };

      (addBook as jest.Mock).mockResolvedValue(mockNewBook);

      const result = await createBookService(mockBook);

      expect(addBook).toHaveBeenCalledWith(mockBook);
      expect(result).toEqual(mockNewBook);
    });
  });

  describe('updateBookService', () => {
    it('should update an existing book and return success', async () => {
      const mockBook: TBook = {
        id: 1,
        title: 'Updated Book',
        author: 'Updated Author',
        isbn: '789',
        image: 'updated-image-url',
      };

      (updateBook as jest.Mock).mockResolvedValue(true);

      const result = await updateBookService(mockBook);

      expect(updateBook).toHaveBeenCalledWith(mockBook);
      expect(result).toBe(true);
    });
  });

  describe('deleteBookService', () => {
    it('should delete a book and return success', async () => {
      const bookId = 1;

      (deleteBook as jest.Mock).mockResolvedValue(true);

      const result = await deleteBookService(bookId);

      expect(deleteBook).toHaveBeenCalledWith(bookId);
      expect(result).toBe(true);
    });
  });
});
