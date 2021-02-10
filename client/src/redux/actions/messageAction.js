import { ADD_MESSAGE, CLEAR_MESSAGE } from "../types/messageType";

export const addMessage = (message) => {
  return {
    type: ADD_MESSAGE,
    payload: message,
  };
};
export const clearMessage = () => {
  return {
    type: CLEAR_MESSAGE,
  };
};
