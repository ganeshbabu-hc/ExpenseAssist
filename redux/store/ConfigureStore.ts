import {createStore, combineReducers} from 'redux';
import CountReducer from '../reducers/CountReducer';
import CurrencyReducer from '../reducers/CurrencyReducer';
import ExpenseReducer from '../reducers/ExpenseReeducer';
const rootReducer = combineReducers({
  count: CountReducer,
  expense: ExpenseReducer,
  currency: CurrencyReducer,
});
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
