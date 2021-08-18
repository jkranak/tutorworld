import { useState, FC } from 'react';
import {Navbar} from '../components/Navbar';
import { TutorProfile } from '../components/TutorProfile';
import { StudentProfile } from '../components/StudentProfile'
import { EditTutorProfile } from '../components/EditTutorProfile';
import { EditStudentProfile } from '../components/EditStudentProfile';
import { ChangePassword } from '../components/ChangePassword';
import { useEffect } from 'react';
import { getStudentDetails, getTutorDetails } from '../services/apiUser';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const Profile: FC = () => {
  const user = useSelector((state: any) => state.authenticate);
  const [userDetails, setUserDetails] = useState(null);
  const [editing, setEditing] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const params = useParams();

  useEffect(() => {
    if (user.role === 'student') {
      getStudentDetails().then(res => {
        setUserDetails(res);
      })
    } else if (user.role === 'tutor') {
      getTutorDetails().then(res => {
        setUserDetails(res);
      })
    }
  }, []);

  console.log(params)

  const editClick = () => {
    setEditing(!editing);
    setChangePassword(false);
  }

  const changeClick = () => {
    setChangePassword(true);
  }
  
  return (
    <div className="profile">
      <Navbar />
      {editing 
      ? user.role === 'tutor' ? <EditTutorProfile tutor={userDetails} setEditing={setEditing}/> : <EditStudentProfile student={userDetails}/> 
      : user.role === 'tutor' ? <TutorProfile tutor={userDetails}/> : <StudentProfile student={userDetails}/>}
      {editing 
      ? <>
          <button onClick={changeClick} className="btn btn--clear">Change password</button>
          {changePassword && <ChangePassword setChangePassword={setChangePassword}/>}
          <button onClick={editClick} className="btn btn--clear">Exit Edit Profile</button>
        </> 
      : <button onClick={editClick} className="btn btn--blue">Edit Profile</button>}
    </div>
  )
}
