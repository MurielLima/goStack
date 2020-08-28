import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface RequestDTO{
  title:string,
  value: number,
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];
  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce((accumulator, transaction) =>{
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

  public create({title, value, type} : RequestDTO): Transaction {
    const transaction = new Transaction({title, value, type});
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
