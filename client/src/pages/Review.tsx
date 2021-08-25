import { FC } from 'react';
import { Navbar } from '../components/Navbar';
import {ReviewComponent} from '../components/ReviewComponent';
import { Link } from 'react-router-dom';

export const Review: FC = () => {
  return (
    <div>
      <Navbar />
        {window.history.state ? <ReviewComponent sessionInfo={window.history.state.state} />: <Link to={"/dashboard"}>Back</Link>}
    </div>
  )
}