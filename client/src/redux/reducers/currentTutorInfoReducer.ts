import { EReduxActionTypes } from "../actions/actionTypes";
// TO-DO fix typescript any
export const currentTutorInfoReducer = (state = null, { type, payload }: any) => {
  switch (type) {
    case EReduxActionTypes.CURRENT_TUTOR_INFO:
      return {...payload};
    default:
      return state;
  }
}