import { SxProps, Theme } from '@mui/material/styles';

export const ModalWrapperStyles: { [key: string]: SxProps<Theme> } = {
  container: {
    margin: '0 auto',
    padding: { xs: '1rem', sm: '1.5rem', md: '2rem' },
    borderRadius: '8px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    width: { xs: '80%', sm: '80%', md: '60%', lg: '50%' },
    maxWidth: '600px',
  },
  title: {
    fontWeight: 600,
    fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
    marginBottom: { xs: '0.75rem', sm: '1rem' },
    textAlign: 'center',
    color: 'black',
  },
};
