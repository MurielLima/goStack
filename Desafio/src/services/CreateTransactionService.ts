import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import { uuid } from 'uuidv4';
/**
 *  * {
  "id": "uuid",
  "title": "Salário",
  "value": 3000,
  "type": "income"
  }
 */
interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    if (type == 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      const totalBalance = balance.total - value;
      if (totalBalance < 0) {
        throw new Error('Balance is not valid');
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
