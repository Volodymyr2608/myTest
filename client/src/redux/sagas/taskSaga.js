import { call, put, takeEvery } from "redux-saga/effects"
import { hideLoaderAction, showLoaderAction } from "../actions/loaderAction"
import { addTask, addTasks, clearTask, fetchTasks } from "../actions/tasksAction"
import { FETCH_TASK, FETCH_TASKS, SAVE_TASK } from "../types/tasksType"

function* WorkerSaveTask(action){
  try {
    yield call(saveTask, {task: action.payload})
    yield put(fetchTasks({id: action.payload.testId}))
    yield put(clearTask())
  } catch (error) {
    console.log(error)
  }
}

export function* WatcherSaveTask() {
  yield takeEvery(SAVE_TASK, WorkerSaveTask)
}

async function saveTask({task}) {
  const response = await fetch('/api/test/task/create', 
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: JSON.stringify(task)
    })
  return response.json()
}

function* WorkerFetchTasks(action){
  try {
    yield put(showLoaderAction())
    const payload = yield call(getTask, {testId: action.payload.id})  
    yield put(addTasks(payload))
    yield put(hideLoaderAction())
  } catch (error) {
    console.log(error)
  }
}

export function* WatcherFetchTasks() {
  yield takeEvery(FETCH_TASKS, WorkerFetchTasks)
}


function* WorkerFetchTask(action){
  try {
    yield put(showLoaderAction())
    const payload = yield call(getTask, {testId: action.payload.id})  
    yield put(addTask(payload))
    yield put(hideLoaderAction())
  } catch (error) {
    console.log(error)
  }
}

export function* WatcherFetchTask() {
  yield takeEvery(FETCH_TASK, WorkerFetchTask)
}


async function getTask({testId}) {
  const response = await fetch(`/api/test/${testId}`, 
    {
      method: 'GET',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: null
    })
  return response.json()
}
