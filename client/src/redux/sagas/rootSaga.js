import { all } from "redux-saga/effects";
import {WatcherCreateClassroom, WatcherFetchClassroom, WatcherFetchClassrooms} from './classroomSaga'
import { WatcherCreateStudent, WatcherDeleteStudent, WatcherUpdateStudent } from "./studentSaga";
import { WatcherFetchTask, WatcherFetchTasks, WatcherSaveTask } from "./taskSaga";
import { WatcherCreateTest, WatcherDeleteTest, WatcherFetchTests, WatcherSaveTest, WatcherUpdateTest } from "./testSaga";
import { WatcherCreateUser, WatcherLoginUser } from "./userSaga";


export default function* rootSaga() {
  yield all([
    WatcherCreateUser(),
    WatcherLoginUser(),
    WatcherCreateClassroom(),
    WatcherFetchClassrooms(),
    WatcherFetchClassroom(),
    WatcherCreateStudent(),
    WatcherUpdateStudent(),
    WatcherDeleteStudent(),
    WatcherFetchTests(),
    WatcherCreateTest(),
    WatcherUpdateTest(),
    WatcherDeleteTest(),
    WatcherSaveTask(),
    WatcherFetchTasks(),
    WatcherFetchTask(),
    WatcherSaveTest()
  ])
}