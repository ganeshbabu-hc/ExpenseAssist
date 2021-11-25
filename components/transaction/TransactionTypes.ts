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

import { Asset } from "react-native-image-picker";

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
  pinned?: number;
}

export interface ITransactionCategory {
  transactionCategoryId?: number;
  title: string;
  description?: string;
  dateAddedTlm?: string;
  transactionType: TransactionType;
  dateUpdatedTlm?: string;
  categoryIcon?: string;
  editable?: number;
  hot?: number;
}

export interface ITransactionImage extends Asset {
  imageId?: number;
  transactionId?: number;
  base64?: string;
}

export interface ITransactionTypes {
  id: number;
  label: string;
  type: TransactionType;
}

