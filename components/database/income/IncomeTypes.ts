export interface IIncome {
  incomeId?: number;
  title: string;
  paymentId: number;
  incomeCategoryId: number;
  amount: number;
  description?: string;
  currencyId: number;
  dateAddedTlm?: string;
  dateUpdatedTlm?: string;
  incomeCategoryTitle?: string;
  incomeCategoryIcon?: string;
  paymentTitle?: string;
  currencySumbol?: string;
}

export interface IIncomeCategory {
  incomeCategoryId: number;
  title: string;
  description: string;
  dateAddedTlm?: string;
  dateUpdatedTlm?: string;
  categoryIcon: string;
}
