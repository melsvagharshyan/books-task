import { useCallback, useEffect } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ModalWrapper from '../../ModalWrapper/ModalWrapper';
import showToast from '../../../helpers/toastHelper';
import { ToastType } from '../../../types/toast.types';
import { bookSchema, TBook } from './utils/validations';
import { bookFields } from './utils/constants';
import { useGetSingleBookQuery, useUpdateBookMutation } from '../../../redux/api/books/books.api';
import { closeUpdateBookModal } from '../../../redux/slices/modalSlice';
import { updateBookModalStyles as styles } from './styles';

const UpdateBookModal: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [updateBook, { isLoading }] = useUpdateBookMutation();
  const { data: book } = useGetSingleBookQuery({ id: Number(bookId) });
  const { isOpenUpdateBookModal } = useSelector((state: any) => state.modal);
  const dispatch = useDispatch();

  const handleCloseModal = useCallback(() => dispatch(closeUpdateBookModal()), [dispatch]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TBook>({ resolver: zodResolver(bookSchema) });

  useEffect(() => {
    if (book) reset(book);
  }, [book, reset]);

  const onSubmit = useCallback(
    async (data: TBook) => {
      try {
        await updateBook({ id: Number(bookId), book: data }).unwrap();
        showToast('Book Updated', ToastType.INFO);
        handleCloseModal();
      } catch (error) {
        showToast('Error updating book', ToastType.ERROR);
        console.error('Error updating book:', error);
      }
    },
    [updateBook, bookId, handleCloseModal],
  );

  return (
    <ModalWrapper open={isOpenUpdateBookModal} onClose={handleCloseModal} title="Update Book">
      <form onSubmit={handleSubmit(onSubmit)}>
        {bookFields.map(({ name, label, required }) => (
          <Controller
            key={name}
            name={name as keyof TBook}
            control={control}
            defaultValue=""
            rules={{ required }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label={`${label}${required ? ' *' : ''}`}
                error={!!errors[name as keyof TBook]}
                helperText={errors[name as keyof TBook]?.message}
                variant="outlined"
                size="medium"
                sx={styles.inputField}
              />
            )}
          />
        ))}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={styles.submitButton}
          fullWidth
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : null}
        >
          {isLoading ? 'Updating...' : 'Update'}
        </Button>
      </form>
    </ModalWrapper>
  );
};

export default UpdateBookModal;
