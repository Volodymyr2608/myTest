const { AUTH, LOGOUT_USER } = require("../types/authType");

const initialState = {
  userData: null,
  isAuth: false
}

export const authReducer = (state=initialState, action) => {
  switch (action.type) {
    case AUTH:
      return {...state, userData: action.payload, isAuth: true}
    case LOGOUT_USER:
      return {...state, userData: null, isAuth: false}
    default:
      return state
  }
}

