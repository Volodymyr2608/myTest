import {combineReducers} from 'redux'
import {classroomsReducer} from './classroomsReducer'
import {classroomReducer} from './classroomReducer'
import { loaderReducer } from './loaderReducer'
import { modalReducer } from './modalReducer'
import { testsReducer } from './testsReducer'
import { tasksReducer } from './tasksReducer'
import { authReducer } from './authReducer'
import { messageReducer } from './messageReducer'

export const rootReducer = combineReducers({
  loader: loaderReducer,
  modal: modalReducer,
  message: messageReducer,
  classrooms: classroomsReducer,
  classroom: classroomReducer,
  tests: testsReducer,
  tasks: tasksReducer,
  auth: authReducer
})