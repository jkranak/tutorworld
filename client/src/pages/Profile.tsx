import { useState } from 'react'
import { TutorProfile } from '../components/TutorProfile';
import { StudentProfile } from '../components/StudentProfile'
import { EditTutorProfile } from '../components/EditTutorProfile';
import { EditStudentProfile } from '../components/EditStudentProfile';
import { ChangePassword } from '../components/ChangePassword';


export const Profile = () => {
  const [role, setRole] = useState('student');
  const [editing, setEditing] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  function editClick () {
    setEditing(!editing);
    setChangePassword(false);
  }

  function changeClick () {
    setChangePassword(true);
  }
  
  
  return (
    <div>
      {editing 
      ? role === 'tutor' ? <EditTutorProfile setEditing={setEditing}/> : <EditStudentProfile setEditing={setEditing}/> 
      : role === 'tutor' ? <TutorProfile /> : <StudentProfile />}
      {editing 
      ? <>
          <button onClick={changeClick}>Change password</button>
          {changePassword && <ChangePassword setChangePassword={setChangePassword}/>}
          <button onClick={editClick}>Exit Edit Profile</button>
        </> 
      : <button onClick={editClick}>Edit Profile</button>}
      
    </div>
  )
}
