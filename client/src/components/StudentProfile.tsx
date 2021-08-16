import { useState } from 'react';
import {Student, emptyStudent} from '../interfaces/Student';

interface Props {
  setEditing: (editing: boolean) => void
}

export const StudentProfile = ({setEditing}: Props) => {
  const [student, setStudent] = useState(emptyStudent);

  function editClick () {
    setEditing(true);
  }

  return (
    <div>
      <img src={student.imageURL} alt={`${student.firstName} ${student.lastName}`} />
      <h3>{student.firstName} {student.lastName}</h3>
      <button onClick={editClick}>Edit Profile</button>
    </div>
  )
}
