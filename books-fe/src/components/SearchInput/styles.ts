import { SxProps, Theme } from '@mui/material/styles';

export const searchInputStyles: { [key: string]: SxProps<Theme> } = {
  input: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'white',
      borderColor: 'gray.300',
      '&:hover': {
        borderColor: 'gray.400',
      },
      '&.Mui-focused': {
        borderColor: 'gray.400',
        outline: 'none',
      },
      color: 'black',
    },
    '& .MuiInputAdornment-root': {
      color: 'gray.400',
    },
  },
};
