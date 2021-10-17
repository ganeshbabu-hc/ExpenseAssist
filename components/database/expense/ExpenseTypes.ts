export interface IExpense {
  expenseId?: number;
  title: string;
  paymentId: number;
  expenseCategoryId: number;
  amount: number;
  description?: string;
  currencyId: number;
  dateAddedTlm?: string;
  dateUpdatedTlm?: string;
}
