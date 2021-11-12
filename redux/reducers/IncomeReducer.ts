import {
  UPDATE_INCOME_CATEGORIES_LIST,
  UPDATE_INCOME_LIST,
} from '../constants/StoreConstants';
import {AnyAction} from 'redux';
import {IIncomeState} from '../Types';

const initialState: IIncomeState = {
  incomeList: [],
  incomeCategoryList: [],
};

const IncomeReducer = (
  state: IIncomeState = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case UPDATE_INCOME_LIST:
      return {
        ...state,
        incomeList: action.payload,
      };
    case UPDATE_INCOME_CATEGORIES_LIST:
      return {
        ...state,
        incomeCategoryList: action.payload,
      };
    default:
      return state;
  }
};
export default IncomeReducer;
