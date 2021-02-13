import { CREATE_STUDENT, DELETE_STUDENT, UPDATE_STUDENT } from "../types/studentType";

export const createStudent = (student) => {
  return {
    type: CREATE_STUDENT,
    payload: student,
  };
};
export const updateStudent = (student) => {
  return {
    type: UPDATE_STUDENT,
    payload: student,
  };
};

export const deleteStudent = (student) => {
  return {
    type: DELETE_STUDENT,
    payload: student,
  };
};
