import z from 'zod';

export const bookSchema = z.object({
  title: z
    .string()
    .min(3, 'Book title must be at least 3 characters')
    .max(30, 'Book title must not exceed 30 characters'),

  author: z
    .string()
    .min(3, 'Book author name must be at least 3 characters')
    .max(30, 'Book author name not exceed 30 characters'),

  isbn: z
    .string()
    .min(10, 'Book ISBN  must be at least 10 characters')
    .max(15, 'Book ISBN must not exceed 15 characters'),

  image: z.string().refine(
    (value) => {
      return value.includes('https://');
    },
    {
      message: 'Image URL must contain https://',
    },
  ),
});

export type TBook = z.infer<typeof bookSchema>;
