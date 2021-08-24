import {FC} from 'react';
import {AiFillCheckCircle} from 'react-icons/ai';
import { Link } from 'react-router-dom';

export const PaymentSuccess: FC = () => {

  return (
    <div className="payment__status">
      <div className="payment__message--text">
        <h1>Payment Confirmed</h1>
        <AiFillCheckCircle className="payment--icon-success"/>
      </div>
      <Link to={'/dashboard'} className="btn btn--blue form--btn">Go to home</Link>
    </div>
  )
}
