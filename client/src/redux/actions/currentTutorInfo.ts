import { EReduxActionTypes } from './actionTypes';
import {TutorWithAvailability} from '../../interfaces/Tutor';

export const currentTutorInfo = (tutor: TutorWithAvailability) => 
({ type: EReduxActionTypes.CURRENT_TUTOR_INFO, payload: tutor });