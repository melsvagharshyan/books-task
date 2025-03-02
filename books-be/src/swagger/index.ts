import { bookSwaggerDocs } from './book.swagger';

export const swaggerDocs = {
  openapi: '3.0.0',
  info: {
    title: 'Book API',
    version: '1.0.0',
    description: 'API documentation for the book management system.',
  },
  paths: {
    ...bookSwaggerDocs,
  },
};
