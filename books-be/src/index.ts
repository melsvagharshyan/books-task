import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initializeDB } from './database/SQLite.database';
import bookRoutes from './routes/book.routes';
import { setupSwagger } from './swagger/swagger';

// Load environment variables
const PORT = process.env.PORT || 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

const app = express();

// Middleware
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

// Swagger
setupSwagger(app);

// Use book routes
app.use('/books', bookRoutes);

// Initialize database and start the server
initializeDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize the database:', err);
    process.exit(1);
  });

export { app };
