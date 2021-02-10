import { HIDE_LOADER, SHOW_LOADER } from "../types/loaderType";

const initialState = {
  isShow: false
}

export const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return {...state, isShow: true}
    case HIDE_LOADER:
      return {...state, isShow: false}
    default:
      return state
  }
}