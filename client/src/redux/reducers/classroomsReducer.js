import { ADD_CLASSROOMS } from "../types/classroomsType";

const initialState = {
  classrooms: [],
};

export const classroomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CLASSROOMS:
      return { ...state, classrooms: action.payload };
    default:
      return state;
  }
};
