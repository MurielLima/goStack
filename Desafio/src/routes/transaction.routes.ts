import { Router } from 'express';
import CreateTransactionService from '../services/CreateTransactionService';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

// import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';
const transactionRouter = Router();
const transactionsRepository = new TransactionsRepository();
// const transactionsRepository = new TransactionsRepository();

/**
 * Essa rota deve retornar uma listagem com todas as transações que você cadastrou até agora,
 *  junto com o valor da soma de entradas, retiradas e total de crédito. Essa rota deve retornar um objeto o seguinte formato:
 */
transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    return response.json({transactions, balance});
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});
/**
 *  A rota deve receber title, value e type dentro do corpo da requisição,
 * sendo type o tipo da transação, que deve ser income para entradas (depósitos) e outcome para saídas (retiradas).
 *  Ao cadastrar uma nova transação, ela deve ser armazenada dentro de um objeto com o seguinte formato :
 *
 * {
  "id": "uuid",
  "title": "Salário",
  "value": 3000,
  "type": "income"
  }
 */
transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const transactionService = new CreateTransactionService(
      transactionsRepository,
    );
    const transaction = transactionService.execute({
      title,
      value,
      type,
    });
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
