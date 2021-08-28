import { EReduxActionTypes } from './actionTypes';
import {UserAuth} from '../../interfaces/User'

export const authenticate = (user: UserAuth | boolean) => 
({ type: EReduxActionTypes.AUTHENTICATE, payload: user });