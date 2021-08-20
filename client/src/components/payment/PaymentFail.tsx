import {FC} from 'react';
import {AiFillWarning} from 'react-icons/ai';
import { Link } from 'react-router-dom';

interface Props {
  setPaymentAttempt: (success: boolean) => void
}

export const PaymentFail: FC<Props> = ({setPaymentAttempt}: Props) => {

  return (
    <div>
      <AiFillWarning/><h1>Payment Failed</h1>
      <button onClick={() => setPaymentAttempt(false)}>Return to checkout</button>
      <Link to={'/dashboard'}>Go to home</Link>
    </div>
  )
}
