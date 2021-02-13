import { call, put, takeEvery } from "redux-saga/effects";
import { authUser } from "../actions/authAction";
import { hideLoaderAction, showLoaderAction } from "../actions/loaderAction";
import { addMessage } from "../actions/messageAction";
import { CREATE_USER, LOGIN_USER } from "../types/authType";

function* WorkerCreateUser(action) {
  try {
    const response = yield call(createUser, { user: action.payload });
    yield put(addMessage(response.message));
  } catch (e) {
    console.log(e);
  }
}

export function* WatcherCreateUser() {
  yield takeEvery(CREATE_USER, WorkerCreateUser);
}

async function createUser({ user }) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(user),
  });
  return response.json();
}

function* WorkerLoginUser(action) {
  try {
    const response = yield call(loginUser, { user: action.payload });
    
    if (response.message) {
      yield put(addMessage(response.message));
    } else {
      yield put(authUser(response));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* WatcherLoginUser() {
  yield takeEvery(LOGIN_USER, WorkerLoginUser);
}

async function loginUser({ user }) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(user),
  });
  return response.json();
}
