import React from 'react';
import {IConfiguration} from '../../components/database/common/CommonController';
import {
  SHOW_MODAL,
  HIDE_MODAL,
  UPDATE_CURRENCY,
  UPDATE_CONFIGURATIONS,
  UPDATE_SCROLLX,
} from '../constants/StoreConstants';

export interface ICommonState {
  showModal: boolean;
  modalContent: React.ComponentType<{}> | null;
  configuration: {
    currency: IConfiguration;
  };
  scrollX: number;
}

const initialState: ICommonState = {
  showModal: false,
  modalContent: null,
  scrollX: 0,
  configuration: {
    currency: {
      name: 'currency',
      type: 'json',
      value: {code: 'INR', currencyId: 47, name: 'Rupees', symbol: '₹'},
    },
  },
};
export const CommonReducer = (state = initialState, action: any) => {
  // console.log(action);
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        modalContent: action.payload.modalContent,
        showModal: true,
      };
    case HIDE_MODAL:
      return {
        ...state,
        modalContent: null,
        showModal: false,
      };
    case UPDATE_CURRENCY:
      let config: ICommonState = {...state};
      console.log(config);
      config.configuration.currency.value = action.payload;
      return config;
    case UPDATE_CONFIGURATIONS:
      return {
        ...state,
        configuration: action.payload,
      };
    case UPDATE_SCROLLX:
      return {
        ...state,
        scrollX: action.payload,
      };
    default:
      return state;
  }
};
