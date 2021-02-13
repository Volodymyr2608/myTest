import { ADD_TESTS, CREATE_TEST, DELETE_TEST, FETCH_TESTS, SAVE_RESULT, UPDATE_TEST } from "../types/testsType"

export const createTest = (test) => {
  return {
    type: CREATE_TEST,
    payload: test
  }
}
export const updateTest = (test) => {
  return {
    type: UPDATE_TEST,
    payload: test
  }
}
export const deleteTest = (test) => {
  return {
    type: DELETE_TEST,
    payload: test
  }
}

export const fetchTests = () => {
  return {
    type: FETCH_TESTS
  }
}
export const addTests = (tests) => {
  return {
    type: ADD_TESTS,
    payload: tests
  }
}
export const saveResult = (test) => {
  return {
    type: SAVE_RESULT,
    payload: test
  }
}