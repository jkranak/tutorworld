import { EReduxActionTypes } from "../actions/actionTypes";
// TO-DO fix typescript any
export const authenticateReducer = (state = null, { type, payload }: any) => {
  switch (type) {
    case EReduxActionTypes.AUTHENTICATE:
      return {...payload};
    default:
      return state;
  }
}