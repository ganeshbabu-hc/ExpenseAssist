import {createStore, combineReducers} from 'redux';
import CountReducer from '../reducers/CountReducer';
import CurrencyReducer from '../reducers/CurrencyReducer';
import ExpenseReducer from '../reducers/ExpenseReeducer';
import IncomeReducer from '../reducers/IncomeReeducer';
import SummaryReducer from '../reducers/SummaryReducer';
const rootReducer = combineReducers({
  count: CountReducer,
  expense: ExpenseReducer,
  currency: CurrencyReducer,
  income: IncomeReducer,
  summary: SummaryReducer,
});
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
