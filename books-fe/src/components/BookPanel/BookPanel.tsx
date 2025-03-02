import { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { useDebounce } from 'use-debounce';

import { useGetBooksQuery } from '../../redux/api/books/books.api';
import SearchBar from '../Searchbar/Searchbar';
import { BookList } from '../BookCard/BookCard';
import CustomPagination from '../Pagination/Pagination';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { bookPanelStyles as styles } from './styles';

const BookPanel: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [debouncedFilter] = useDebounce(filter, 500);

  const { data, isLoading, isError } = useGetBooksQuery({
    limit: 6,
    page,
    filter: debouncedFilter,
  });

  const totalPages = useMemo(() => data?.total || 1, [data]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setPage(1);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isLoading) return <Loader />;

  if (isError) return <ErrorMessage message={'Error loading books. Please try again later.'} />;

  return (
    <Box sx={styles.container}>
      <SearchBar searchValue={filter} onSearchChange={handleSearchChange} />
      <BookList books={data?.books || []} />
      <CustomPagination totalPages={totalPages} page={page} handlePageChange={handlePageChange} />
    </Box>
  );
};

export default BookPanel;
