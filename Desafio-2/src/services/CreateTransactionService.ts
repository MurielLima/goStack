// import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import { TransactionRepository, getRepository } from 'typeorm';
interface RequestDTO {
  title: string;

  type: 'income' | 'outcome';

  value: number;

  category_id: string;
}

class CreateTransactionService {
  public async execute({
    title,
    type,
    value,
    category_id,
  }: RequestDTO): Promise<Transaction> {
    const transactionRepository = getRepository(Transaction);
    const transaction = await transactionRepository.create({
      title,
      type,
      value,
      category_id
    });
    return transaction;
  }
}

export default CreateTransactionService;
