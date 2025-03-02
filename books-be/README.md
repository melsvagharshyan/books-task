# Project Title

Book Search API

## Run Locally

Go to the project directory

```bash
  cd books-be
```

Install dependencies

```bash
  npm install
```

Set up environment variables:

Create a .env file in the root of the project and add the following configuration:

PORT=3000
CLIENT_ORIGIN=http://localhost:5173

Start the server

```bash
  npm run dev
```

Used Node.js version v20.18.1

## Swagger UI

Once the server is running, you can access the Swagger UI to explore and test the API.

Visit http://localhost:3000/api-docs to view the Swagger documentation.
Swagger provides a user-friendly interface to interact with the API, view all available endpoints, and make test requests.

## Features

Add, list, update, and delete books.

Search books by title, author, or ISBN.

Pagination support for listing books.

CORS enabled for frontend access (configured for http://localhost:5173).

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Tech Stack

Backend: Node.js, Express.js

Database: SQLite

TypeScript for type safety

Jest for testing

CORS for allowing frontend communication
