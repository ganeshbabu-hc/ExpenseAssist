import {ICurrency} from '../components/database/common/CurrencyController';
import {IExpense} from '../components/database/expense/ExpenseTypes';

export interface IExpenseState {
  expenseList: IExpense[];
}

export interface ICurrencyTypeState {
  currencyTypes: ICurrency[];
}
