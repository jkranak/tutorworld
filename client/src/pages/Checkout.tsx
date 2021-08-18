import { useState, FC } from 'react';
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Payment } from '../components/Payment';
import { PaymentSuccess } from '../components/PaymentSuccess';
import { PaymentFail } from '../components/PaymentFail';
import { Navbar } from '../components/Navbar';


export const Checkout: FC = () => {
  const sessionInfo = window.history.state.state;
  const [paymentAttempt, setPaymentAttempt] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  const [stripeTestPromise] = useState(() => loadStripe(PUBLIC_KEY!))

  return (
    <Elements stripe={stripeTestPromise}>
      <Navbar/>
      {!paymentAttempt 
      ? <Payment sessionInfo={sessionInfo} setPaymentSuccess={setPaymentSuccess} setPaymentAttempt={setPaymentAttempt}/> 
      : paymentSuccess ? <PaymentSuccess /> : <PaymentFail setPaymentAttempt={setPaymentAttempt}/> }
    </Elements>
  )
}
