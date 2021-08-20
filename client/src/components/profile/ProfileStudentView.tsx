import {FC} from 'react';
import noPhotoUser from '../../assets/no_photo_user.png';
import { StudentComplete } from '../../interfaces/Student';

interface Props {
  studentDetails: StudentComplete
}



export const ProfileStudentView: FC<Props> = ({studentDetails}: Props) => {

  return (
    <div className="student-profile">
      <div className="image-box">
        {studentDetails.imageUrl ? 
         <img src={studentDetails.imageUrl} alt={`${studentDetails.firstName} ${studentDetails.lastName}`} />
         :
         <img src={noPhotoUser} alt={`${studentDetails.firstName} ${studentDetails.lastName}`} />
        }
      </div>
      <div className="student-profile__info">
        <p className="student-profile__name">{studentDetails.firstName} {studentDetails.lastName}</p>
        <p>{studentDetails.email}</p>
      </div>
    </div>
  )
}
