import { ADD_CLASSROOM, FETCH_CLASSROOM } from "../types/classroomType";

export const fetchClassroom = (classroom) => {
  return {
    type: FETCH_CLASSROOM,
    payload: classroom,
  };
};

export const addClassroom = (classroom) => {
  return {
    type: ADD_CLASSROOM,
    payload: classroom
  };
};
