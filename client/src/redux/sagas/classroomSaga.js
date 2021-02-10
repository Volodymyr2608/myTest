import { call, put, takeEvery } from "redux-saga/effects";
import { addClassroom } from "../actions/classroomAction";
import { addClassrooms, fetchClassrooms } from "../actions/classroomsAction";
import { hideLoaderAction, showLoaderAction } from "../actions/loaderAction";
import { addMessage } from "../actions/messageAction";
import { CREATE_CLASSROOM, FETCH_CLASSROOMS } from "../types/classroomsType";
import { FETCH_CLASSROOM } from "../types/classroomType";

/* Create Class */
function* WorkerCreateClassroom(action) {
  try {
    yield put(showLoaderAction());
    const response = yield call(createClassroom, {
      classroom: action.payload.classroom,
      token: action.payload.token,
    });
    
    yield put(fetchClassrooms({ token: action.payload.token }));
    yield put(addMessage(response.message));
  } catch (error) {
    console.log(error);
  }
}

export function* WatcherCreateClassroom() {
  yield takeEvery(CREATE_CLASSROOM, WorkerCreateClassroom);
}

async function createClassroom({ classroom, token }) {
  const response = await fetch("/api/classroom/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(classroom),
  });
  return response.json();
}

/* Fetch Classrooms */

function* WorkerFetchClassrooms(action) {
  try {
    yield put(showLoaderAction());
    const payload = yield call(getClassrooms, { token: action.payload.token });
    yield put(addClassrooms(payload));
    yield put(hideLoaderAction());
  } catch (error) {
    console.log(error);
  }
}

export function* WatcherFetchClassrooms() {
  yield takeEvery(FETCH_CLASSROOMS, WorkerFetchClassrooms);
}

async function getClassrooms({ token }) {
  const response = await fetch("/api/classroom/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: null,
  });
  return response.json();
}

/* Fetch Classroom */

function* WorkerFetchClassroom(action) {
  yield put(showLoaderAction());
  const payload = yield call(getClassroom, {
    id: action.payload.classId,
    token: action.payload.token,
  });
  yield put(addClassroom(payload));
  yield put(hideLoaderAction());
}

export function* WatcherFetchClassroom() {
  yield takeEvery(FETCH_CLASSROOM, WorkerFetchClassroom);
}

async function getClassroom({ id, token }) {
  const response = await fetch(`/api/classroom/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: null,
  });
  return response.json();
}
