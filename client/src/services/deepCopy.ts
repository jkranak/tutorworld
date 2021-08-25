import { AvailabilityDays } from '../interfaces/Availability';
import {TutorWithAvailability} from '../interfaces/Tutor';

export const deepCopyAvail = (availObj: AvailabilityDays) => {
  return {
    sunday: {...availObj.sunday},
    monday: {...availObj.monday},
    tuesday: {...availObj.tuesday},
    wednesday: {...availObj.wednesday},
    thursday: {...availObj.thursday},
    friday: {...availObj.friday},
    saturday: {...availObj.saturday},
  }
}