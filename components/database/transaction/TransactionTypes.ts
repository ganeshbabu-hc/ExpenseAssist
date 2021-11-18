// export interface IExpense {
//   expenseId?: number;
//   title: string;
//   paymentId: number;
//   transactionCategoryId: number;
//   amount: number;
//   description?: string;
//   currencyId: number;
//   dateAddedTlm?: string;
//   dateUpdatedTlm?: string;
//   transactionCategoryTitle?: string;
//   transactionCategoryIcon?: string;
//   paymentTitle?: string;
//   currencySumbol?: string;
// }

export enum TransactionType {
  EXPENSE = 'expense',
  INCOME = 'income',
  ALL = 'all',
  PINNED = 'pinned',
}
export interface ITransaction {
  transactionId?: number;
  title: string;
  paymentId: number;
  transactionCategoryId: number;
  amount: number;
  description?: string;
  transactionType: TransactionType;
  currencyId: number;
  dateAddedTlm?: string;
  dateUpdatedTlm?: string;
  transactionCategoryTitle?: string;
  transactionCategoryIcon?: string;
  paymentTitle?: string;
  currencySumbol?: string;
  pinned?: boolean;
}

export interface ITransactionCategory {
  transactionCategoryId?: number;
  title: string;
  description?: string;
  dateAddedTlm?: string;
  transactionType: TransactionType;
  dateUpdatedTlm?: string;
  categoryIcon?: string;
}
