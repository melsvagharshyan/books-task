import { SxProps, Theme } from '@mui/material/styles';

export const bookDetailsStyles: { [key: string]: SxProps<Theme> } = {
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 3,
    width: { xs: '90%', sm: '70%', md: '50%', lg: '30%' },
    margin: 'auto',
    gap: 3,
    borderRadius: 2,
    border: 1,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)',
  },
  infoBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  name: {
    color: 'text.primary',
    fontWeight: 'bold',
    textAlign: 'start',
    fontFamily: 'Playwrite IT Moderna, serif',
    fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
  },
  subTitle: {
    display: 'flex',
    gap: '5px',
    color: 'primary.main',
    marginTop: 1,
    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
  },
  info: {
    color: 'text.secondary',
    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
  },
  description: {
    color: 'text.secondary',
    marginTop: 1,
    textAlign: 'start',
    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
  },
  buttonContainer: {
    display: 'flex',
    gap: 2,
    marginTop: 3,
    flexDirection: { xs: 'column', sm: 'row' },
  },
  button: {
    boxShadow: '1px 1px 1px 1px #E8E2E2',
    border: 'none',
    borderRadius: '5px',
    textTransform: 'unset',
    fontWeight: 'bold',
    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
    padding: { xs: '6px 12px', sm: '8px 16px', md: '10px 20px' },
  },
  arrowBack: {
    marginBottom: 2,
    padding: 1,
    minWidth: 0,
    fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
  },
};
