import { useState, FC } from 'react';
import {Navbar} from '../components/Navbar';
import { TutorProfile } from '../components/TutorProfile';
import { StudentProfile } from '../components/StudentProfile'
import { EditTutorProfile } from '../components/EditTutorProfile';
import { EditStudentProfile } from '../components/EditStudentProfile';
import { ChangePassword } from '../components/ChangePassword';
import { useEffect } from 'react';
import { getStudentDetails } from '../services/apiUser';
import { StudentComplete } from '../interfaces/Student';
import { useSelector } from 'react-redux';

export const Profile: FC = () => {
  const user = useSelector((state: any) => state.authenticate);
  const [userDetails, setUserDetails] = useState<StudentComplete | null>(null);
  const [editing, setEditing] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    getStudentDetails().then(res => {
      setUserDetails(res);
    })
  }, [])

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
      ? user.role === 'tutor' ? <EditTutorProfile setEditing={setEditing}/> : <EditStudentProfile setEditing={setEditing} student={userDetails}/> 
      : user.role === 'tutor' ? <TutorProfile /> : <StudentProfile student={userDetails}/>}
      {editing 
      ? <>
          <button onClick={changeClick}>Change password</button>
          {changePassword && <ChangePassword setChangePassword={setChangePassword}/>}
          <button onClick={editClick}>Exit Edit Profile</button>
        </> 
      : <button onClick={editClick} className="btn btn--blue">Edit Profile</button>}
    </div>
  )
}
