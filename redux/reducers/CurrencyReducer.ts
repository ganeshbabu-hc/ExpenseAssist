import {UPDATE_CURRENCY_TYPES} from '../constants/StoreConstants';
import {AnyAction} from 'redux';
import {ICurrencyTypeState} from '../Types';

const initialState: ICurrencyTypeState = {
  currencyTypes: [],
};

const CurrencyReducer = (
  state: ICurrencyTypeState = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case UPDATE_CURRENCY_TYPES:
      return {
        ...state,
        currencyTypes: action.payload,
      };
    default:
      return state;
  }
};
export default CurrencyReducer;
