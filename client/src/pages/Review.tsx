import { FC } from 'react';
import { Navbar } from '../components/Navbar';
import {ReviewComponent} from '../components/ReviewComponent';
import { Link } from 'react-router-dom';
import './review.css';


export const Review: FC = () => {
  
  return (
    <div>
      <Navbar />
        {window.history.state ? <ReviewComponent />: <Link to={"/dashboard"}>Back</Link>}
    </div>
  )
}
