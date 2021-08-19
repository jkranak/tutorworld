import { EReduxActionTypes } from './actionTypes';

// TO-DO fix typescript any
export const currentTutorInfo = (tutor: any) => 
({ type: EReduxActionTypes.CURRENT_TUTOR_INFO, payload: tutor });