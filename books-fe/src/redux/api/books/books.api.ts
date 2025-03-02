import { api } from '../api';
import { TBook, TPaginatedResponse } from './book.types';

const base = '/books';

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<TPaginatedResponse, { page: number; limit: number; filter?: string }>({
      query: ({ page, limit, filter }) => {
        let url = `${base}?page=${page}&limit=${limit}`;
        if (filter) url += `&filter=${encodeURIComponent(filter)}`;
        return url;
      },
      providesTags: ['BOOKS', 'BOOK'],
    }),
    getSingleBook: builder.query<TBook, { id: number }>({
      query: ({ id }) => ({
        url: `${base}/${id}`,
        method: 'GET',
      }),
      providesTags: ['BOOK'],
    }),
    addBook: builder.mutation<TBook, Partial<TBook>>({
      query: (newBook) => ({
        url: `${base}`,
        method: 'POST',
        body: newBook,
      }),
      invalidatesTags: ['BOOKS'],
    }),
    updateBook: builder.mutation<{ success: boolean }, { id: number; book: Partial<TBook> }>({
      query: ({ id, book }) => ({
        url: `${base}/${id}`,
        method: 'PUT',
        body: book,
      }),
      invalidatesTags: ['BOOK', 'BOOKS'],
    }),
    deleteBook: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `${base}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BOOKS'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = booksApi;
