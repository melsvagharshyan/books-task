export type TBook = {
  id: number;
  title: string;
  author: string;
  isbn: string;
  image: string;
};

export type TPaginatedResponse = {
  books: TBook[];
  total: number;
};
