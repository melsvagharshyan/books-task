import { SxProps, Theme } from '@mui/material/styles';

export const searchBarStyles: { [key: string]: SxProps<Theme> } = {
  container: {
    position: 'relative',
    width: { xs: '90%', sm: '70%', md: '50%', lg: '30%' },
    margin: 'auto',
    marginBottom: 2,
    display: 'flex',
    gap: 2,
    flexDirection: { xs: 'column', sm: 'row' },
    alignItems: { xs: 'center', sm: 'flex-start' },
  },
  bookIcon: {
    fontSize: { xs: 18, sm: 20, md: 22 },
    marginBottom: '1px',
    marginLeft: { xs: '0px', sm: '5px' },
  },
  button: {
    background: '#2563eb',
    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
    padding: { xs: '6px 12px', sm: '8px 16px', md: '10px 20px' },
  },
};
