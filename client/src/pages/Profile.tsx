import { useState, FC } from 'react';
import {Navbar} from '../components/Navbar';
import { TutorProfile } from '../components/TutorProfile';
import { StudentProfile } from '../components/StudentProfile'
import { EditTutorProfile } from '../components/EditTutorProfile';
import { EditStudentProfile } from '../components/EditStudentProfile';
import { ChangePassword } from '../components/ChangePassword';


export const Profile: FC = () => {
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
      <Navbar />
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
