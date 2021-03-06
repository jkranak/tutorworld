import { EReduxActionTypes } from "../actions/actionTypes";

export const currentRoomReducer = (state = null, { type, payload }: any) => {
  switch (type) {
    case EReduxActionTypes.CURRENT_ROOM:
      return payload;
    default:
      return state;
  }
}