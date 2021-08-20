import { FC } from 'react';
import {Navbar} from '../components/Navbar';
import { ProfileTutor } from '../components/profile/ProfileTutor';
import { ProfileStudent } from '../components/profile/ProfileStudent'
import { useSelector } from 'react-redux';

export const Profile: FC = () => {
  const user = useSelector((state: any) => state.authenticate);

  return (
    <div className="profile">
      <Navbar />
      {user.role === 'tutor' ? <ProfileTutor id={user.id} /> : <ProfileStudent />}
    </div>
  )
}
