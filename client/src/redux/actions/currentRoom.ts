import { RoomI } from '../../interfaces/Room';
import { EReduxActionTypes } from './actionTypes';

export const currentRoom = (room: RoomI) => 
({ type: EReduxActionTypes.CURRENT_ROOM, payload: room });