import {FC} from 'react';
import {AiFillCheckCircle} from 'react-icons/ai';
import { Link } from 'react-router-dom';

export const PaymentSuccess: FC = () => {

  return (
    <div>
      <AiFillCheckCircle/><h1>Payment Confirmed</h1>
      <Link to={'/dashboard'}>Go to home</Link>
    </div>
  )
}
