import { EReduxActionTypes } from './actionTypes';

// TO-DO fix typescript any
export const authenticate = (user: any) => 
({ type: EReduxActionTypes.AUTHENTICATE, payload: user });