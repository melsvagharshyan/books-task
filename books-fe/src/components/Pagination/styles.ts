export const paginationStyles = {
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  pagination: {
    '& .MuiPaginationItem-root': {
      backgroundColor: '#f3f4f6',
      borderRadius: '15%',
      color: '#2563eb',
      fontFamily: 'Playwrite IT Moderna, serif',
      '&:hover': {
        backgroundColor: '#e0e7ff',
      },
    },
    '& .MuiPaginationItem-root.Mui-selected': {
      backgroundColor: '#2563eb',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#1d4ed8',
      },
    },
    '& .MuiPaginationItem-ellipsis': {
      color: '#2563eb',
    },
  },
};
