import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();
    const balance = transactions.reduce((accumulator, transaction) =>{
      switch(transaction.type){
        case 'income':
          accumulator.income += transaction.value;
          break;
        case 'outcome':
          accumulator.outcome += transaction.value;
          break;
        default:
          break;
      }
      accumulator.total = accumulator.income - accumulator.outcome;
      return accumulator;
    },
    {
      income:0,
      outcome:0,
      total:0
    });
    // const transactionsIncome = this.transactions.filter(transaction => transaction.type == 'income');
    // const transactionsOutcome = this.transactions.filter(transaction => transaction.type == 'outcome');
    // const sumTransactionsIncome = transactionsIncome.map(transaction => balance.income += transaction.value);
    // const sumTransactionsOutcome = transactionsOutcome.map(transaction => balance.outcome += transaction.value);
    // const sumTotal = this.transactions.map(transaction => balance.total += transaction.value);
    return balance;
  }
}

export default TransactionsRepository;
