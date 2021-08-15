import {useState} from 'react'
import {TutorProfile} from '../components/TutorProfile';
import {StudentProfile} from '../components/StudentProfile'


export const Profile = () => {
  const [role, setRole] = useState('tutor');
  
  return (
    <div>
      {role === 'tutor' ? <TutorProfile /> : <StudentProfile />}
    </div>
  )
}
