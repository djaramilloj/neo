import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';
import { NextFunction, Request, Response } from 'express';
import { AppError } from './middleware/errorHandler';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
// Helmet helps secure Express apps by setting various HTTP headers
app.use(helmet());
// CORS enables cross-origin resource sharing, allowing APIs to be accessed from different domains
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Error handling middleware
app.use((err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app; 