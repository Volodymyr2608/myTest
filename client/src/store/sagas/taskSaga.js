import { call, put, takeEvery } from "redux-saga/effects";
import { hideLoaderAction, showLoaderAction } from "../actions/loaderAction";
import {
  addTask,
  addTasks,
  clearTask,
  fetchTasks,
} from "../actions/tasksAction";
import {
  CREATE_TASK,
  FETCH_TASK,
  FETCH_TASKS,
  SAVE_TASK,
  UPDATE_TASK,
} from "../types/tasksType";

function* WorkerCreateTask(action) {
  try {
    yield call(createTask, {
      task: action.payload.task,
      token: action.payload.token,
    });
    yield put(
      fetchTasks({
        testId: action.payload.task.testId,
        token: action.payload.token,
      })
    );
    // yield put(clearTask())
  } catch (error) {
    console.log(error);
  }
}

export function* WatcherCreateTask() {
  yield takeEvery(CREATE_TASK, WorkerCreateTask);
}

async function createTask({ task, token }) {
  const response = await fetch("/api/test/task/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  return response.json();
}

function* WorkerUpdateTask(action) {
  try {
    yield call(updateTask, {
      task: action.payload.task,
      token: action.payload.token,
    });
    yield put(
      fetchTasks({
        testId: action.payload.task.testId,
        token: action.payload.token,
      })
    );
    // yield put(clearTask())
  } catch (error) {
    console.log(error);
  }
}

export function* WatcherUpdateTask() {
  yield takeEvery(UPDATE_TASK, WorkerUpdateTask);
}

async function updateTask({ task, token }) {
  const response = await fetch("/api/test/task/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  return response.json();
}

function* WorkerFetchTasks(action) {
  try {
    // yield put(showLoaderAction());
    const payload = yield call(getTasks, {
      id: action.payload.testId,
      token: action.payload.token,
    });

    yield put(addTasks(payload));
    // yield put(hideLoaderAction());
  } catch (error) {
    console.log(error);
  }
}

export function* WatcherFetchTasks() {
  yield takeEvery(FETCH_TASKS, WorkerFetchTasks);
}

// function* WorkerFetchTask(action){
//   try {
//     yield put(showLoaderAction())
//     const payload = yield call(getTask, {testId: action.payload.id, token: action.payload.token})
//     yield put(addTask(payload))
//     yield put(hideLoaderAction())
//   } catch (error) {
//     console.log(error)
//   }
// }

// export function* WatcherFetchTask() {
//   yield takeEvery(FETCH_TASK, WorkerFetchTask)
// }

async function getTasks({ id, token }) {
  const response = await fetch(`/api/test/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: null,
  });
  return response.json();
}
