import React from 'react';
import { IToast } from '../../components/common/ToastNotification';
import { IConfiguration } from '../../components/database/common/CommonController';
import {
  SHOW_MODAL,
  HIDE_MODAL,
  UPDATE_CURRENCY,
  UPDATE_CONFIGURATIONS,
  SHOW_TOAST,
  SET_THEME,
} from '../constants/StoreConstants';

export interface ICommonState {
  showModal: boolean;
  modalContent: React.ComponentType<{}> | null;
  configuration: {
    currency: IConfiguration;
  };
  theme: string;
  scrollX: number;
  toast: IToast[];
}

const initialState: ICommonState = {
  showModal: false,
  modalContent: null,
  scrollX: 0,
  configuration: {
    currency: {
      name: 'currency',
      type: 'json',
      value: { code: 'INR', currencyId: 47, name: 'Rupees', symbol: '₹' },
    },
  },
  theme: 'lightPurple',
  toast: [],
};
export const CommonReducer = (state = initialState, action: any) => {
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
      let config: ICommonState = { ...state };
      config.configuration.currency.value = action.payload;
      return config;
    case UPDATE_CONFIGURATIONS:
      return {
        ...state,
        configuration: action.payload,
      };
    default:
      return state;
    case SHOW_TOAST:
      return {
        ...state,
        toast: action.payload,
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
  }
};
