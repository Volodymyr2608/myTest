import {ADD_TESTS} from '../types/testsType'

const initialState = {
  tests: []
}

export const testsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TESTS:
      return {...state, tests: action.payload}
    default:
      return state
  }
}