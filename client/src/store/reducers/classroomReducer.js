import { ADD_CLASSROOM } from "../types/classroomType";

const initialState = {
  classroom: {
    _id: '',
    parallel: '',
    letter: '',
    students: [],
    tests: [],
    currentTest: []
  },
}

export const classroomReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CLASSROOM:
      return {...state, classroom: action.payload}
    default:
      return state
  }
}