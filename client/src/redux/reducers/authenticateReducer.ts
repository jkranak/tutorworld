import { EReduxActionTypes } from '../actions/actionTypes';
import {UserAuth} from '../../interfaces/User';

interface ReduceObj {
  type: string
  payload: {user: UserAuth | boolean}
}

export const authenticateReducer = (state = null, { type, payload }: ReduceObj) => {
  switch (type) {
    case EReduxActionTypes.AUTHENTICATE:
      return {...payload};
    default:
      return state;
  }
}