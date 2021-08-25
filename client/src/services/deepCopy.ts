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

export const deepCopyTutorAvail = (tutorArr: TutorWithAvailability[]) => {
  const newTutorArr = tutorArr.map((tutor: TutorWithAvailability) => {
    const newTutor = {...tutor};
    newTutor.languages = [...tutor.languages];
    newTutor.subjectLevels = [...tutor.subjectLevels];
    const newAvail = {
      TutorId: tutor.availability.TutorId,
      createdAt: tutor.availability.createdAt,
      updatedAt: tutor.availability.updatedAt,
      id: tutor.availability.id,
      sunday: {...tutor.availability.sunday},
      monday: {...tutor.availability.monday},
      tuesday: {...tutor.availability.tuesday},
      wednesday: {...tutor.availability.wednesday},
      thursday: {...tutor.availability.thursday},
      friday: {...tutor.availability.friday},
      saturday: {...tutor.availability.saturday},
    }
    newTutor.availability = newAvail;
    return newTutor;
  })
  return newTutorArr;
}