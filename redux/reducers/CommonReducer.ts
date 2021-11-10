import React from 'react';
import {SHOW_MODAL, HIDE_MODAL} from '../constants/StoreConstants';

export interface ICommonState {
  showModal: boolean;
  modalContent: React.ComponentType<{}> | null;
}

const initialState: ICommonState = {
  showModal: false,
  modalContent: null,
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
    default:
      return state;
  }
};
