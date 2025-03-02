import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import Avatar from '../../components/Avatar/Avatar';
import CreateBookModal from '../Modals/CreateBookModal/CreateBookModal';
import { TBook } from '../../redux/api/books/book.types';
import { bookCardStyles as styles } from './styles';

type TBookCardProps = {
  book: TBook;
};

const BookCard: React.FC<TBookCardProps> = ({ book }) => {
  return (
    <Box key={book.id} sx={styles.bookItem}>
      <Avatar avatarUrl={book.image} width={250} height={360} />
      <Box sx={styles.titleBox}>
        <Typography variant="h6" sx={styles.title}>
          {book.title}
        </Typography>
        <Box sx={styles.subTitle}>
          Author: <Typography sx={styles.info}>{book?.author}</Typography>
        </Box>
        <Box sx={styles.subTitle}>
          ISBN: <Typography sx={styles.info}>{book?.isbn}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

type TBookListProps = {
  books: TBook[];
};

const BookList: React.FC<TBookListProps> = ({ books }) => {
  return (
    <Box mt={2} sx={styles.listBox}>
      {books.map((book) => (
        <Link key={book.id} to={`book/${book.id}`} style={styles.link}>
          <BookCard key={book.id} book={book} />
        </Link>
      ))}
      <CreateBookModal />
    </Box>
  );
};

export { BookCard, BookList };
