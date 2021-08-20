import {FC, useEffect, useState} from 'react';
import { getFavTutors } from '../../services/apiUser';

export const FavTutors: FC = () => {
  const [favTutors, setFavTutors] = useState();

  useEffect(() => {
    getFavTutors().then(res => {
      console.log(res);
      // setFavTutors(res);
    })
  }, [])

  return (
    <div>
      <p>fav tutors</p>
    </div>
  )
}
