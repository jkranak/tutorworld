import { useState } from 'react'
import { TutorProfile } from '../components/TutorProfile';
import { StudentProfile } from '../components/StudentProfile'
import { EditTutorProfile } from '../components/EditTutorProfile';
import { EditStudentProfile } from '../components/EditStudentProfile';


export const Profile = () => {
  const [role, setRole] = useState('student');
  const [editing, setEditing] = useState(false);
  
  return (
    <div>
      {editing 
      ? role === 'tutor' ? <EditTutorProfile setEditing={setEditing}/> : <EditStudentProfile setEditing={setEditing}/> 
      : role === 'tutor' ? <TutorProfile setEditing={setEditing} /> : <StudentProfile setEditing={setEditing} />}
    </div>
  )
}
