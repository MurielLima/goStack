import { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import express from 'express-async-errors';
import uploadConfig from './config/upload';
import './database';
import AppError from './errors/AppError';

const app = express();

app.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Hello World' });
});
app.get('/files', express.static(uploadConfig.directory));
app.listen(3333, () => {
  console.log('Server started on port 3333!');
});

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }
    console.log(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error.'
    });
  },
);
