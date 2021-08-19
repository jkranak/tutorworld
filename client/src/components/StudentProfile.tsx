import {FC} from 'react';
import { UserDetails } from '../interfaces/User';
import noPhotoUser from '../assets/no_photo_user.png';

interface Props {
  student: UserDetails
}
export const StudentProfile: FC<Props> = ({ student }: Props) => {

    return (
    student &&
    <div className="student-profile">
      <div className="image-box">
        {student.imageUrl ? 
         <img src={student.imageUrl} alt={`${student.firstName} ${student.lastName}`} />
         :
         <img src={noPhotoUser} alt={`${student.firstName} ${student.lastName}`} />
        }
      </div>
      <div className="student-profile__info">
        <p className="student-profile__name">{student.firstName} {student.lastName}</p>
        <p>{student.email}</p>
      </div>
    </div>
  )
}
