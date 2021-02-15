import {
  ADD_TASK,
  ADD_TASKS,
  CLEAR_TASK,
  CREATE_TASK,
} from "../types/tasksType";

const initialState = {
  tasks: [],
  task: null,
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK:
      return { ...state, task: action.payload };
    case CLEAR_TASK:
      return { ...state, task: null };
    case ADD_TASKS:
      return { ...state, tasks: action.payload };
    case ADD_TASK:
      return { ...state, currentTest: action.payload };
    default:
      return state;
  }
};
