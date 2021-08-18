import {FC} from 'react';
import {TutorInfo} from '../interfaces/Tutor';
import {starRating} from '../services/starRating';
import {BsStarFill, BsStar, BsStarHalf} from 'react-icons/bs'

interface Props {
  tutor: TutorInfo
}

export const SearchResult: FC<Props> = ({tutor}: Props) => {
  const starArr: number[] = starRating(tutor?.TutorInfo.rating);

  return (
    <>
    <div>
      <h3>{tutor?.firstName} {tutor?.lastName}</h3>
      <img src={tutor?.TutorInfo.imageUrl} alt={`${tutor?.firstName} ${tutor?.lastName}`} />
    </div>
    <div>
      <h3>Education: </h3><p>{tutor?.TutorInfo.education}</p>
      {starArr.map((el, index) => (
        <span key={index}>{el === 2 ? <BsStarFill/> : el === 1 ? <BsStarHalf/> : <BsStar/>}</span>
      ))}
      <p>Rate: ${tutor?.TutorInfo.price}/hour</p>
    </div>
    <div>
      <p>{tutor?.TutorInfo.description}</p>
    </div>
    </>
  )
}
