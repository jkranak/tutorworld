import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getFavTutors } from '../../services/apiUser';
import { currentTutorInfo } from '../../redux/actions/currentTutorInfo';
import { TutorWithAvailability, emptyTutorWithAvailability } from '../../interfaces/Tutor';

export const FavTutors: FC = () => {
  const [favTutors, setFavTutors] = useState([emptyTutorWithAvailability]);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSchedule = (index: number) => {
    dispatch(currentTutorInfo(favTutors[index]));
    history.push('/schedule');
  }

  const handleProfile = (index: number) => {
    dispatch(currentTutorInfo(favTutors[index]));
    history.push('/viewprofile');
  }

  useEffect(() => {
    getFavTutors().then(res => {
      setFavTutors(res);
    })
  }, [])

  return (
    <div>
      {favTutors.map((tutor: TutorWithAvailability, index: number) => (
        <p key={tutor.TutorId}>
        <img src={tutor.imageUrl} height="40px" alt={`${tutor.firstName} ${tutor.lastName}`}/>
        {tutor.firstName} {tutor.lastName} 
        <button onClick={() => handleSchedule(index)}>
          Schedule
        </button> 
        Message 
        <button onClick={() => handleProfile(index)}>
          Profile
        </button></p>
      ))}
    </div>
  )
}
