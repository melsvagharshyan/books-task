import { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { deleteModalStyles as styles } from './styles';

type TDeleteModalProps = {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteModal: FC<TDeleteModalProps> = ({ isOpen, isLoading, onClose, onConfirm }) => (
  <Dialog open={isOpen} onClose={onClose} sx={styles.dialog}>
    <DialogTitle sx={styles.dialog}>Delete Confirmation</DialogTitle>
    <DialogContent>Are you sure you want to delete this book?</DialogContent>
    <DialogActions>
      <Button sx={styles.dialog} onClick={onClose} variant="outlined" color="primary">
        No
      </Button>
      <Button
        sx={styles.dialog}
        onClick={onConfirm}
        variant="contained"
        color="error"
        disabled={isLoading}
      >
        Yes
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteModal;
