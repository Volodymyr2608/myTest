import { call, put, takeEvery } from "redux-saga/effects";
import { fetchClassroom } from "../actions/classroomAction";
import { fetchClassrooms } from "../actions/classroomsAction";
import { showLoaderAction } from "../actions/loaderAction";
import { addMessage } from "../actions/messageAction";
import { fetchTasks } from "../actions/tasksAction";
import { addTests, fetchTests } from "../actions/testsAction";
import {
  CREATE_TEST,
  DELETE_TEST,
  FETCH_TESTS,
  SAVE_RESULT,
  UPDATE_TEST,
} from "../types/testsType";

function* WorkerCreateTest(action) {
  try {
    yield put(showLoaderAction());
    const response = yield call(createTest, {
      test: action.payload.test,
      token: action.payload.token,
    });
    yield put(
      fetchClassroom({
        classId: action.payload.test.classId,
        token: action.payload.token,
      })
    );
    yield put(addMessage(response.message));

  } catch (error) {
    console.log(error);
  }
}

export function* WatcherCreateTest() {
  yield takeEvery(CREATE_TEST, WorkerCreateTest);
}

async function createTest({ test, token }) {
  const response = await fetch("/api/test/create", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(test),
  });
  return response.json();
}

function* WorkerUpdateTest(action) {
  try {
    yield put(showLoaderAction());
    const response = yield call(updateTest, {
      test: action.payload.test,
      token: action.payload.token,
    });
    yield put(
      fetchClassroom({
        classId: action.payload.test.classId,
        token: action.payload.token,
      })
    );
    yield put(addMessage(response.message));
  
  } catch (error) {
    console.log(error);
  }
}

export function* WatcherUpdateTest() {
  yield takeEvery(UPDATE_TEST, WorkerUpdateTest);
}

async function updateTest({ test, token }) {
  const response = await fetch("/api/test/update", {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(test),
  });
  return response.json();
}

function* WorkerDeleteTest(action) {
  try {
    yield put(showLoaderAction());
    const response = yield call(deleteTest, {
      id: action.payload._id,
      token: action.payload.token,
    });
    yield put(
      fetchClassroom({
        classId: action.payload.classId,
        token: action.payload.token,
      })
    );
    yield put(addMessage(response.message));

  } catch (error) {
    console.log(error);
  }
}

export function* WatcherDeleteTest() {
  yield takeEvery(DELETE_TEST, WorkerDeleteTest);
}

async function deleteTest({ id, token }) {
  const response = await fetch("/api/test/delete", {
    method: "DELETE",
    headers: { 
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({id}),
  });
  return response.json();
}

function* WorkerFetchTests(action) {
  try {
    yield put(fetchClassrooms());
    const tests = yield call(getTests);
    yield put(addTests(tests));
  } catch (error) {
    console.log(error);
  }
}

export function* WatcherFetchTests() {
  yield takeEvery(FETCH_TESTS, WorkerFetchTests);
}

async function getTests() {
  const response = await fetch("/api/test/", {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: null,
  });
  return response.json();
}

function* WorkerSaveTest(action) {
  try {
    yield call(saveResultTest, { test: action.payload });
  } catch (error) {
    console.log(error);
  }
}

export function* WatcherSaveTest() {
  yield takeEvery(SAVE_RESULT, WorkerSaveTest);
}

async function saveResultTest({ test }) {
  const response = await fetch("/api/test/save", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(test),
  });

  return response.json();
}
