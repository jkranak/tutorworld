import {TutorWithAvailability} from '../../interfaces/Tutor';

export interface IReduxBaseAction {
  payload: TutorWithAvailability;
  type: EReduxActionTypes;
}

export enum EReduxActionTypes {
  AUTHENTICATE = 'AUTHENTICATE',
  CURRENT_TUTOR_INFO = 'CURRENT_TUTOR_INFO',
  CURRENT_ROOM = 'CURRENT_ROOM'
}

