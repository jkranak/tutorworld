import {FC} from 'react';
import {AiFillWarning} from 'react-icons/ai';
import { Link } from 'react-router-dom';

interface Props {
  setPaymentAttempt: (success: boolean) => void
}

export const PaymentFail: FC<Props> = ({setPaymentAttempt}: Props) => {

  return (
    <div className="payment__status">
      <div className="payment__message--text">
        <h1>Payment Failed</h1>
        <AiFillWarning className="payment--icon-fail"/>
      </div>
      <button onClick={() => setPaymentAttempt(false)} className="btn btn--clear">Return to checkout</button>
      <Link to={'/dashboard'} className="btn btn--blue form--btn">Go to home</Link>
    </div>
  )
}
