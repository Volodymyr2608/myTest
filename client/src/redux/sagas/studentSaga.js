import { call, put, takeEvery } from "redux-saga/effects";
import { fetchClassroom } from "../actions/classroomAction";
import { showLoaderAction } from "../actions/loaderAction";
import { addMessage } from "../actions/messageAction";
import {
  CREATE_STUDENT,
  DELETE_STUDENT,
  UPDATE_STUDENT,
} from "../types/studentType";

function* WorkerCreateStudent(action) {
  try {
    yield put(showLoaderAction());
    const response = yield call(createStudent, {
      student: action.payload.student,
      token: action.payload.token,
    });
    yield put(
      fetchClassroom({
        classId: action.payload.student.classId,
        token: action.payload.token,
      })
    );
    yield put(addMessage(response.message));
  } catch (error) {
    console.log(error);
  }
}

export function* WatcherCreateStudent() {
  yield takeEvery(CREATE_STUDENT, WorkerCreateStudent);
}

async function createStudent({ student, token }) {
  const response = await fetch("/api/student/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(student),
  });
  return response.json();
}

function* WorkerUpdateStudent(action) {
  try {
    yield put(showLoaderAction());
    const response = yield call(updateStudent, {
      student: action.payload.student,
      token: action.payload.token,
    });
    yield put(
      fetchClassroom({
        classId: action.payload.student.classId,
        token: action.payload.token,
      })
    );
    yield put(addMessage(response.message));
  } catch (error) {
    console.log(error);
  }
}

export function* WatcherUpdateStudent() {
  yield takeEvery(UPDATE_STUDENT, WorkerUpdateStudent);
}

async function updateStudent({ student, token }) {
  const response = await fetch("/api/student/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(student),
  });
  return response.json();
}

function* WorkerDeleteStudent(action) {
  try {
    yield put(showLoaderAction());
    const response = yield call(deleteStudent, {
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

export function* WatcherDeleteStudent() {
  yield takeEvery(DELETE_STUDENT, WorkerDeleteStudent);
}

async function deleteStudent({ id, token }) {
  const response = await fetch("/api/student/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });

  return response.json();
}
