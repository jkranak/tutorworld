import { EReduxActionTypes } from './actionTypes';
import {UserAuth} from '../../interfaces/User'

// TO-DO fix typescript any
export const authenticate = (user: UserAuth | boolean) => 
({ type: EReduxActionTypes.AUTHENTICATE, payload: user });

//id: string, role: string, SenderId: string