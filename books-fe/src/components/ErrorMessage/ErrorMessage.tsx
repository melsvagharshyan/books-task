import { FC } from 'react';
import { Alert, Box } from '@mui/material';

import { errorMessageStyles as styles } from './styles';

type TErrorMessage = {
  message: string;
};

const ErrorMessage: FC<TErrorMessage> = ({ message }) => {
  return (
    <Box sx={styles.error}>
      <Alert severity="error">{message}</Alert>
    </Box>
  );
};

export default ErrorMessage;
