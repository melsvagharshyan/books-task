import { Request, Response } from 'express';
import {
  listBooks,
  getBook,
  createBook,
  updateBookById,
  deleteBookById,
} from '../controllers/book.controller';
import {
  listBooksService,
  getBookService,
  createBookService,
  updateBookService,
  deleteBookService,
} from '../services/book.service';

jest.mock('../services/book.service');

describe('Book Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnThis();

    req = {};
    res = {
      status: statusMock,
      json: jsonMock,
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('listBooks', () => {
    it('should return a list of books with valid query parameters', async () => {
      const mockBooks = [{ id: 1, title: 'Book 1' }];
      (listBooksService as jest.Mock).mockResolvedValue(mockBooks);

      req.query = { filter: 'Book', page: '1', limit: '10' };

      await listBooks(req as Request, res as Response);

      expect(listBooksService).toHaveBeenCalledWith('Book', 1, 10);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockBooks);
    });
  });

  describe('getBook', () => {
    it('should return a book if it exists', async () => {
      const mockBook = { id: 1, title: 'Book 1' };
      (getBookService as jest.Mock).mockResolvedValue(mockBook);

      req.params = { id: '1' };

      await getBook(req as Request, res as Response);

      expect(getBookService).toHaveBeenCalledWith(1);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockBook);
    });
  });

  describe('createBook', () => {
    it('should create a book with required fields', async () => {
      const mockBook = {
        id: 1,
        title: 'Book 1',
        author: 'Author 1',
        isbn: '123456',
        image: 'image.jpg',
      };
      (createBookService as jest.Mock).mockResolvedValue(mockBook);

      req.body = mockBook;

      await createBook(req as Request, res as Response);

      expect(createBookService).toHaveBeenCalledWith(mockBook);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(mockBook);
    });
  });

  describe('updateBookById', () => {
    it('should update a book if it exists', async () => {
      (updateBookService as jest.Mock).mockResolvedValue(true);

      req.params = { id: '1' };
      req.body = {
        title: 'Updated Book',
        author: 'Author 1',
        isbn: '123456',
        image: 'image.jpg',
      };

      await updateBookById(req as Request, res as Response);

      expect(updateBookService).toHaveBeenCalledWith({ id: '1', ...req.body });
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Book updated successfully' });
    });
  });

  describe('deleteBookById', () => {
    it('should delete a book if it exists', async () => {
      (deleteBookService as jest.Mock).mockResolvedValue(true);

      req.params = { id: '1' };

      await deleteBookById(req as Request, res as Response);

      expect(deleteBookService).toHaveBeenCalledWith(1);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Book deleted successfully' });
    });
  });
});
