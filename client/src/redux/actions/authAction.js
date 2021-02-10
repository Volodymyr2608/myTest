import { CREATE_USER, LOGIN_USER, LOGOUT_USER, AUTH } from "../types/authType";

export const storageName = 'userData'

export const createUser = (user) => {
  return {
    type: CREATE_USER,
    payload: user,
  };
};
export const loginUser = (user) => {
  return {
    type: LOGIN_USER,
    payload: user,
  };
};

export const authUser = (payload) => {
  localStorage.setItem(storageName, JSON.stringify({...payload}))
  return {
    type: AUTH,
    payload
  };
};

export const logoutUser = () => {
  localStorage.removeItem(storageName)
  return {
    type: LOGOUT_USER
  };
};
