import app from './app';
import { Request, Response } from 'express-async-errors';
import AppError from '../errors/AppError';

app.use((err: Error, reques: Request, response: Response) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.log(err);
  return response.status(400).json({
    status: 'error',
    message: 'Internal server error',
  });
});
app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
