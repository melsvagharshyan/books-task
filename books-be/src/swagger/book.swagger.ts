export const bookSwaggerDocs = {
  '/books': {
    get: {
      summary: 'Get all books',
      tags: ['Books'],
      description: 'Retrieve a paginated list of books with optional filtering.',
      parameters: [
        {
          in: 'query',
          name: 'filter',
          schema: { type: 'string' },
          description: 'Filter books by title, author, or ISBN.',
        },
        {
          in: 'query',
          name: 'page',
          schema: { type: 'integer', default: 1 },
          description: 'Page number for pagination.',
        },
        {
          in: 'query',
          name: 'limit',
          schema: { type: 'integer', default: 10 },
          description: 'Number of books per page.',
        },
      ],
      responses: {
        200: {
          description: 'A paginated list of books.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  books: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'number', example: 1 },
                        title: { type: 'string', example: 'The Great Gatsby' },
                        author: { type: 'string', example: 'F. Scott Fitzgerald' },
                        isbn: { type: 'string', example: '9780743273565' },
                        image: { type: 'string', example: 'https://example.com/book.jpg' },
                      },
                    },
                  },
                  total: { type: 'number', example: 100 },
                  page: { type: 'number', example: 1 },
                  limit: { type: 'number', example: 10 },
                },
              },
            },
          },
        },
        400: { description: 'Invalid pagination parameters.' },
        500: { description: 'Failed to retrieve books.' },
      },
    },
    post: {
      summary: 'Create a new book',
      tags: ['Books'],
      description: 'Add a new book to the collection.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['title', 'author', 'isbn', 'image'],
              properties: {
                title: { type: 'string', example: 'The Catcher in the Rye' },
                author: { type: 'string', example: 'J.D. Salinger' },
                isbn: { type: 'string', example: '9780316769488' },
                image: { type: 'string', example: 'https://example.com/catcher.jpg' },
              },
            },
          },
        },
      },
      responses: {
        201: { description: 'Book created successfully.' },
        400: { description: 'Missing required fields.' },
        500: { description: 'Failed to add book.' },
      },
    },
  },

  '/books/{id}': {
    get: {
      summary: 'Get a book by ID',
      tags: ['Books'],
      description: 'Retrieve details of a specific book.',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' },
          description: 'The ID of the book.',
        },
      ],
      responses: {
        200: { description: 'Book details.' },
        404: { description: 'Book not found.' },
        500: { description: 'Failed to retrieve book.' },
      },
    },
    put: {
      summary: 'Update a book by ID',
      tags: ['Books'],
      description: 'Update details of an existing book.',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' },
          description: 'The ID of the book.',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['title', 'author', 'isbn', 'image'],
              properties: {
                title: { type: 'string', example: 'Updated Title' },
                author: { type: 'string', example: 'Updated Author' },
                isbn: { type: 'string', example: '9780316769488' },
                image: { type: 'string', example: 'https://example.com/updated.jpg' },
              },
            },
          },
        },
      },
      responses: {
        200: { description: 'Book updated successfully.' },
        400: { description: 'Missing required fields.' },
        404: { description: 'Book not found.' },
        500: { description: 'Failed to update book.' },
      },
    },
    delete: {
      summary: 'Delete a book by ID',
      tags: ['Books'],
      description: 'Remove a book from the collection.',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' },
          description: 'The ID of the book.',
        },
      ],
      responses: {
        200: { description: 'Book deleted successfully.' },
        404: { description: 'Book not found.' },
        500: { description: 'Failed to delete book.' },
      },
    },
  },
};
