import {
  HIDE_MODAL,
  SHOW_MODAL,
  SHOW_IS_DELETE,
  HIDE_IS_DELETE,
} from "../types/modalType";

const initialState = {
  isShow: false,
  isDelete: false,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, isShow: true };
    case HIDE_MODAL:
      return { ...state, isShow: false };
    case SHOW_IS_DELETE:
      return { ...state, isDelete: true };
    case HIDE_IS_DELETE:
      return { ...state, isDelete: false };
    default:
      return state;
  }
};
