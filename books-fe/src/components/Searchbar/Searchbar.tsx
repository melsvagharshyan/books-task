import { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Book } from '@mui/icons-material';

import SearchInput from '../SearchInput/SearchInput';
import { searchBarStyles as styles } from './styles';
import { useDispatch } from 'react-redux';
import { openCreateBookModal } from '../../redux/slices/modalSlice';

type TSearchBarProps = {
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar: FC<TSearchBarProps> = ({ searchValue, onSearchChange }) => {
  const dispatch = useDispatch();

  const handleOpenCreateBookModal = () => dispatch(openCreateBookModal());

  return (
    <Box sx={styles.container}>
      <SearchInput value={searchValue} onChange={onSearchChange} />
      <Button onClick={handleOpenCreateBookModal} sx={styles.button} variant="contained">
        New
        <Book sx={styles.bookIcon} />
      </Button>
    </Box>
  );
};

export default SearchBar;
