import {UPDATE_SUMMARY} from '../constants/StoreConstants';
import {AnyAction} from 'redux';
import {ISummaryState} from '../Types';

const initialState: ISummaryState = {
  summaryList: {
    totalExpense: 0,
    totalIncome: 0,
    monthlyExpense: 0,
    monthlyIncome: 0,
  },
};

const SummaryReducer = (
  state: ISummaryState = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case UPDATE_SUMMARY:
      return {
        ...state,
        summaryList: action.payload,
      };
    default:
      return state;
  }
};
export default SummaryReducer;
