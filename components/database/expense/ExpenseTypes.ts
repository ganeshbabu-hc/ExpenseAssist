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
  expenseCategoryTitle?: string;
  expenseCategoryIcon?: string;
  paymentTitle?: string;
  currencySumbol?: string;
}

export interface IExpenseCategory {
  expenseCategoryId: number;
  title: string;
  description: string;
  dateAddedTlm?: string;
  dateUpdatedTlm?: string;
  categoryIcon: string;
}

export enum ExpenseCategory {
  EXPENSE_CATEGORY_ID = 'expenseCategoryId',
  TITLE = 'title',
  DESCRIPTION = 'description',
  DATE_ADDED_TLM = 'dateAddedTlm',
  DATE_UPDATED_TLM = 'dateUpdatedTlm',
  CATEGORY_ICON = 'categoryIcon',
}
