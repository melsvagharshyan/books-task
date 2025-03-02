import React from 'react';
import { Box, Pagination } from '@mui/material';

import { paginationStyles as styles } from './styles';

type TPaginationProps = {
  totalPages: number;
  page: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

const CustomPagination: React.FC<TPaginationProps> = ({ totalPages, page, handlePageChange }) => {
  return (
    <Box sx={styles.paginationContainer}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        sx={styles.pagination}
      />
    </Box>
  );
};

export default CustomPagination;
