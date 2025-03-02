import { Box, CircularProgress } from '@mui/material';

import { loaderStyles as styles } from './styles';

const Loader = () => {
  return (
    <Box sx={styles.loader}>
      <CircularProgress size={60} />
    </Box>
  );
};

export default Loader;
