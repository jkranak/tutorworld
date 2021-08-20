import { RoomI } from '../../interfaces/Room';
import { EReduxActionTypes } from './actionTypes';

// TO-DO fix typescript any
export const currentRoom = (room: RoomI) => 
({ type: EReduxActionTypes.CURRENT_ROOM, payload: room });