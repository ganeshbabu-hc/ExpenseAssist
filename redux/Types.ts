import {ICurrency} from '../components/database/common/CurrencyController';
import {ISummary} from '../components/database/common/SummaryController';
import {IExpense} from '../components/database/expense/ExpenseTypes';
import {IIncome} from '../components/database/income/IncomeTypes';

export interface IExpenseState {
  expenseList: IExpense[];
}

export interface ICurrencyTypeState {
  currencyTypes: ICurrency[];
}
export interface IIncomeState {
  incomeList: IIncome[];
}

export interface ISummaryState {
  summaryList: ISummary;
}
