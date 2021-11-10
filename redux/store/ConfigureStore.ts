import {createStore, combineReducers} from 'redux';
import {CommonReducer} from '../reducers/CommonReducer';
import CurrencyReducer from '../reducers/CurrencyReducer';
import ExpenseReducer from '../reducers/ExpenseReeducer';
import IncomeReducer from '../reducers/IncomeReeducer';
import SummaryReducer from '../reducers/SummaryReducer';
const rootReducer = combineReducers({
  common: CommonReducer,
  expense: ExpenseReducer,
  currency: CurrencyReducer,
  income: IncomeReducer,
  summary: SummaryReducer,
});
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
