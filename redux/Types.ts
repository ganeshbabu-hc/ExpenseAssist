import {ICurrency} from '../components/database/common/CurrencyController';
import {ISummary} from '../components/database/common/SummaryController';
import {
  IExpense,
  IExpenseCategory,
} from '../components/database/expense/ExpenseTypes';
import {
  IIncome,
  IIncomeCategory,
} from '../components/database/income/IncomeTypes';

export interface IExpenseState {
  expenseList: IExpense[];
  expenseCategoryList: IExpenseCategory[];
}

export interface ICurrencyTypeState {
  currencyTypes: ICurrency[];
}
export interface IIncomeState {
  incomeList: IIncome[];
  incomeCategoryList: IIncomeCategory[];
}

export interface ISummaryState {
  summaryList: ISummary;
}
