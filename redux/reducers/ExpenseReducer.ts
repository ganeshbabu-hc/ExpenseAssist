import {
  UPDATE_EXPENSE_CATEGORIES_LIST,
  UPDATE_EXPENSE_LIST,
} from '../constants/StoreConstants';
import {AnyAction} from 'redux';
import {IExpenseState} from '../Types';

const initialState: IExpenseState = {
  expenseList: [],
  expenseCategoryList: [],
};

const ExpenseReducer = (
  state: IExpenseState = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case UPDATE_EXPENSE_LIST:
      return {
        ...state,
        expenseList: action.payload,
      };
    case UPDATE_EXPENSE_CATEGORIES_LIST:
      return {
        ...state,
        expenseCategoryList: action.payload,
      };
    default:
      return state;
  }
};
export default ExpenseReducer;
