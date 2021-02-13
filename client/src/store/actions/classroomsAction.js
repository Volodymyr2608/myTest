import {
  CREATE_CLASSROOM,
  FETCH_CLASSROOMS,
  ADD_CLASSROOMS,
} from "../types/classroomsType";

export const createClassroom = (classroom) => {
  return {
    type: CREATE_CLASSROOM,
    payload: classroom,
  };
};
export const fetchClassrooms = (token) => {
  return {
    type: FETCH_CLASSROOMS,
    payload: token
  };
};

export const addClassrooms = (classrooms) => {
  return {
    type: ADD_CLASSROOMS,
    payload: classrooms,
  };
};
