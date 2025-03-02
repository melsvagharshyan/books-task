import { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch } from 'react-redux';

import Avatar from '../../components/Avatar/Avatar';
import DeleteModal from '../../components/Modals/DeleteModal/DeleteModal';
import UpdateBookModal from '../../components/Modals/UpdateBookModal/UpdateBookModal';
import showToast from '../../helpers/toastHelper';
import { ToastType } from '../../types/toast.types';
import { useDeleteBookMutation, useGetSingleBookQuery } from '../../redux/api/books/books.api';
import { openUpdateBookModal } from '../../redux/slices/modalSlice';
import { bookDetailsStyles as styles } from './styles';

export const BookDetailsPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookId } = useParams<{ bookId: string }>();

  const { data: book } = useGetSingleBookQuery({ id: Number(bookId) });
  const [deleteBook, { isLoading }] = useDeleteBookMutation();

  const handleDelete = useCallback(async () => {
    if (!book?.id) return;
    try {
      await deleteBook(book.id).unwrap();
      showToast('Book Deleted', ToastType.INFO);
      navigate('/');
    } catch (error) {
      showToast('Failed to delete the book', ToastType.ERROR);
    }
  }, [book?.id, deleteBook, navigate]);

  const handleEdit = () => dispatch(openUpdateBookModal());
  const handleBack = useCallback(() => navigate(-1), [navigate]);

  return (
    <Box sx={styles.container}>
      <Button variant="outlined" onClick={handleBack} sx={styles.arrowBack}>
        <ArrowBackIcon />
      </Button>

      <Avatar avatarUrl={book?.image} width={280} height={400} />

      <Box sx={styles.infoBox}>
        <Typography variant="h4" sx={styles.name}>
          {book?.title}
        </Typography>
        <Typography variant="subtitle1" sx={styles.subTitle}>
          Author:{' '}
          <Typography component="span" sx={styles.info}>
            {book?.author}
          </Typography>
        </Typography>
        <Typography variant="subtitle1" sx={styles.subTitle}>
          ISBN:{' '}
          <Typography component="span" sx={styles.info}>
            {book?.isbn}
          </Typography>
        </Typography>

        <Box sx={styles.buttonContainer}>
          <Button variant="outlined" sx={styles.button} onClick={handleEdit}>
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={styles.button}
            onClick={() => setModalOpen(true)}
          >
            Delete
          </Button>
        </Box>
      </Box>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        isLoading={isLoading}
      />
      <UpdateBookModal />
    </Box>
  );
};
