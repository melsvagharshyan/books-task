import { Request, Response } from 'express';
import {
  listBooksService,
  getBookService,
  createBookService,
  updateBookService,
  deleteBookService,
} from '../services/book.service';

const validateBookFields = (book: any) => {
  const { title, author, isbn, image } = book;
  return title && author && isbn && image;
};

export const listBooks = async (req: Request, res: Response): Promise<any> => {
  try {
    const { filter = '', page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    if (isNaN(pageNumber) || pageNumber <= 0 || isNaN(limitNumber) || limitNumber <= 0) {
      return res.status(400).json({ error: 'Invalid page or limit' });
    }

    const result = await listBooksService(filter as string, pageNumber, limitNumber);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve books' });
  }
};

export const getBook = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const book = await getBookService(Number(id));

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve book' });
  }
};

export const createBook = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!validateBookFields(req.body)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newBook = await createBookService(req.body);
    return res.status(201).json(newBook);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to add book' });
  }
};

export const updateBookById = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!validateBookFields(req.body)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const { id } = req.params;

    const success = await updateBookService({ id, ...req.body });

    if (!success) {
      return res.status(404).json({ error: 'Book not found' });
    }

    return res.status(200).json({ message: 'Book updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update book' });
  }
};

export const deleteBookById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const success = await deleteBookService(Number(id));

    if (!success) {
      return res.status(404).json({ error: 'Book not found' });
    }

    return res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete book' });
  }
};
