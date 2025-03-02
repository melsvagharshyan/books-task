import BookPanel from '../components/BookPanel/BookPanel';
import { BookDetailsPage } from '../pages/BookDetailsPage/index';

import { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <BookPanel />,
  },
  {
    path: 'book/:bookId',
    element: <BookDetailsPage />,
  },
];
