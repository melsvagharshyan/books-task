import { useCallback } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';

import ModalWrapper from '../../ModalWrapper/ModalWrapper';
import showToast from '../../../helpers/toastHelper';
import { ToastType } from '../../../types/toast.types';
import { bookSchema, TBook } from './utils/validations';
import { bookFields } from './utils/constants';
import { closeCreateBookModal } from '../../../redux/slices/modalSlice';
import { useAddBookMutation } from '../../../redux/api/books/books.api';
import { createBookModalStyles as styles } from './styles';

const CreateBookModal: React.FC = () => {
  const [addBook] = useAddBookMutation();
  const { isOpenCreateBookModal } = useSelector((state: any) => state.modal);
  const dispatch = useDispatch();

  const handleCloseModal = useCallback(() => dispatch(closeCreateBookModal()), [dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TBook>({
    resolver: zodResolver(bookSchema),
    defaultValues: { title: '', author: '', isbn: '', image: '' },
  });

  const onSubmit = useCallback(
    async (data: TBook) => {
      try {
        await addBook(data).unwrap();
        showToast('Book Created', ToastType.INFO);
        reset();
        handleCloseModal();
      } catch (error) {
        showToast('Error creating book', ToastType.ERROR);
        console.error('Error creating book:', error);
      }
    },
    [addBook, reset, handleCloseModal],
  );

  return (
    <ModalWrapper open={isOpenCreateBookModal} onClose={handleCloseModal} title="Create Book">
      <form onSubmit={handleSubmit(onSubmit)}>
        {bookFields.map(({ name, label, required }) => (
          <TextField
            key={name}
            label={`${label}${required ? ' *' : ''}`}
            fullWidth
            {...register(name as keyof TBook)}
            error={!!errors[name as keyof TBook]}
            helperText={errors[name as keyof TBook]?.message}
            variant="outlined"
            size="medium"
            sx={styles.inputField}
          />
        ))}
        <Box sx={styles.buttonContainer}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSubmitting}
            sx={styles.submitButton}
          >
            {isSubmitting ? 'Creating...' : 'CREATE'}
          </Button>
        </Box>
      </form>
    </ModalWrapper>
  );
};

export default CreateBookModal;
