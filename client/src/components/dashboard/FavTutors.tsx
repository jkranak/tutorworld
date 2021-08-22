import { FC, useEffect, useState } from 'react';
import { getFavTutors } from '../../services/apiUser';
import { TutorWithAvailability, emptyTutorWithAvailability } from '../../interfaces/Tutor';
import { FavTutorsEntry } from './FavTutorsEntry';

export const FavTutors: FC = () => {
  const [favTutors, setFavTutors] = useState([emptyTutorWithAvailability]);
  
  useEffect(() => {
    getFavTutors().then(res => {
      setFavTutors(res);
    })
  }, [])

  return (
    <div className="dashboard__content--display--info">
      <h1 className="dashboard__content--display--title">Favorite Tutors</h1>
      <div className="dashboard__content--display--sessions">
        {favTutors.map((tutor: TutorWithAvailability) => (
          <FavTutorsEntry tutor={tutor}/>
        ))}
      </div>
    </div>
  )
}
