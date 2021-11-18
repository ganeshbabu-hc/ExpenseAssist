export interface IIncome {
  incomeId?: number;
  title: string;
  paymentId: number;
  transactionCategoryId: number;
  amount: number;
  description?: string;
  currencyId: number;
  dateAddedTlm?: string;
  dateUpdatedTlm?: string;
  transactionCategoryTitle?: string;
  transactionCategoryIcon?: string;
  paymentTitle?: string;
  currencySumbol?: string;
}

export interface IIncomeCategory {
  transactionCategoryId: number;
  title: string;
  description: string;
  dateAddedTlm?: string;
  dateUpdatedTlm?: string;
  categoryIcon: string;
}
