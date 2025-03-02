import { FC, ChangeEvent } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { searchInputStyles as styles } from './styles';

type TSearchInputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput: FC<TSearchInputProps> = ({ value, onChange }) => (
  <TextField
    value={value}
    onChange={onChange}
    placeholder="Search by title, author, ISBN"
    fullWidth
    variant="outlined"
    size="medium"
    sx={styles.input}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon color="disabled" />
        </InputAdornment>
      ),
    }}
  />
);

export default SearchInput;
