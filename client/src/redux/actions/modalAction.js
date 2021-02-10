import {
  HIDE_MODAL,
  HIDE_IS_DELETE,
  SHOW_MODAL,
  SHOW_IS_DELETE,
} from "../types/modalType";

export const showModal = () => {
  return {
    type: SHOW_MODAL,
  };
};

export const hideModal = () => {
  return {
    type: HIDE_MODAL,
  };
};

export const showIsDelete = () => {
  return {
    type: SHOW_IS_DELETE,
  };
};

export const hideISDelete = () => {
  return {
    type: HIDE_IS_DELETE,
  };
};
