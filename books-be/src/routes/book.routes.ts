import { Router } from 'express';
import {
  createBook,
  deleteBookById,
  getBook,
  listBooks,
  updateBookById,
} from '../controllers/book.controller';

const router = Router();

router.get('/', listBooks);
router.get('/:id', getBook);
router.post('/', createBook);
router.put('/:id', updateBookById);
router.delete('/:id', deleteBookById);

export default router;
