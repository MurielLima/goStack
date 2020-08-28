import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = new TransactionsRepository();
  const transactions = await transactionsRepository.find();
  const balance = await transactionsRepository.getBalance();
  return response.json({transactions, balance});
});
/**
 * A rota deve receber title, value, type, e category dentro do corpo da requisição,
 *  sendo o type o tipo da transação, que deve ser income para entradas (depósitos) e outcome para saídas (retiradas).
 *  Ao cadastrar uma nova transação, ela deve ser armazenada dentro do seu banco de dados,
 *  possuindo os campos id, title, value, type, category_id, created_at, updated_at.
 */
transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;
  const createTransactionService = new CreateTransactionService();
  const transaction = await createTransactionService.execute({
    title,
    value,
    type,
    category_id : category,
  });
});
/**
 *  A rota deve deletar uma transação com o id presente nos parâmetros da rota;
 */
transactionsRouter.delete('/:id', async (request, response) => {

});

/**
 * A rota deve permitir a importação de um arquivo com formato .csv contendo as mesmas informações
 *  necessárias para criação de uma transação id, title, value, type, category_id, created_at, updated_at,
 *  onde cada linha do arquivo CSV deve ser um novo registro para o banco de dados,
 *  e por fim retorne todas as transactions que foram importadas para seu banco de dados.
 *  O arquivo csv, deve seguir o seguinte modelo
 */
transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
