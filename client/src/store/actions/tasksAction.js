import {
  CREATE_TASK,
  FETCH_TASKS,
  ADD_TASKS,
  SAVE_TASK,
  CLEAR_TASK,
  FETCH_TASK,
  ADD_TASK,
  UPDATE_TASK,
} from "../types/tasksType";

export const createTask = (task) => {
  return {
    type: CREATE_TASK,
    payload: task,
  };
};
export const updateTask = (task) => {
  return {
    type: UPDATE_TASK,
    payload: task,
  };
};

export const fetchTasks = (test) => {
  return {
    type: FETCH_TASKS,
    payload: test,
  };
};

export const clearTask = () => {
  return {
    type: CLEAR_TASK,
  };
};

export const saveTask = (task) => {
  return {
    type: SAVE_TASK,
    payload: task,
  };
};


export const fetchTask = (id) => {
  return {
    type: FETCH_TASK,
    payload: id,
  };
};

export const addTasks = (tasks) => {
  return {
    type: ADD_TASKS,
    payload: tasks,
  };
};
export const addTask = (tasks) => {
  return {
    type: ADD_TASK,
    payload: tasks,
  };
};
