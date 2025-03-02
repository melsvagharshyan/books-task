import { ReactNode } from 'react';
import { Box, Modal, Typography } from '@mui/material';

import { ModalWrapperStyles as styles } from './styles';

type TModalWrapperProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

const ModalWrapper: React.FC<TModalWrapperProps> = ({ open, onClose, title, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.container}>
        <Typography variant="h6" component="h2" gutterBottom sx={styles.title}>
          {title || 'Modal Title'}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default ModalWrapper;
