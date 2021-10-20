import {COUNTER_CHANGE} from '../constants/StoreConstants';
const initialState = {
  count: 0,
};
const CountReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case COUNTER_CHANGE:
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
};
export default CountReducer;
