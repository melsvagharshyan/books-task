export const bookCardStyles = {
  bookItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    alignItems: 'center',
    mb: 2,
    p: 2,
    borderRadius: 2,
    bgcolor: 'white',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)',
  },
  title: {
    fontWeight: 'bold',
    color: '#2E2E2E',
    textAlign: 'center',
    fontFamily: 'Playwrite IT Moderna, serif',
  },
  titleBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  subTitle: {
    display: 'flex',
    gap: '5px',
    color: 'primary.main',
    marginTop: 1,
    textAlign: 'center',
  },
  info: {
    color: 'text.secondary',
  },
  listBox: { display: 'flex', flexFlow: 'wrap', gap: '10px' },
  link: { textDecoration: 'none' },
};
