import {AiFillCheckCircle} from 'react-icons/ai';
import { Link } from 'react-router-dom';

export const PaymentSuccess = () => {

  return (
    <div>
      <AiFillCheckCircle/><h1>Payment Confirmed</h1>
      <Link to={'/dashboard'}>Go to home</Link>
    </div>
  )
}
