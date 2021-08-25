import { EReduxActionTypes } from "../actions/actionTypes";
import {TutorWithAvailability} from '../../interfaces/Tutor';

interface tutorReduceObj {
  type: string
  payload: {tutor: TutorWithAvailability}
}
export const currentTutorInfoReducer = (state = null, { type, payload }: tutorReduceObj) => {
  switch (type) {
    case EReduxActionTypes.CURRENT_TUTOR_INFO:
      return {...payload};
    default:
      return state;
  }
}