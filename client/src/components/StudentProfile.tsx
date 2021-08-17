import { useState, FC } from 'react';
import { emptyStudent} from '../interfaces/Student';


export const StudentProfile: FC = () => {
  const [student, setStudent] = useState(emptyStudent);

  return (
    <div>
      <img src={student.imageURL} alt={`${student.firstName} ${student.lastName}`} />
      <h3>{student.firstName} {student.lastName}</h3>
    </div>
  )
}
