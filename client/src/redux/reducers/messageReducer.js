import { ADD_MESSAGE, CLEAR_MESSAGE } from "../types/messageType"

const initialState = {
  message: null
}

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {...state, message: action.payload}
    case CLEAR_MESSAGE:
      return {...state, message: null}
    default:
      return state
  }
}