import { useState } from 'react';
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Payment } from '../components/Payment';
import { PaymentSuccess } from '../components/PaymentSuccess';
import { PaymentFail } from '../components/PaymentFail';
import { Navbar } from '../components/Navbar';


export const Checkout = () => {
  const price = 1000;
  const [paymentAttempt, setPaymentAttempt] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  const stripeTestPromise = loadStripe(PUBLIC_KEY!)

  return (
    <Elements stripe={stripeTestPromise}>
      <Navbar/>
      <p>${price / 100}</p>
      {!paymentAttempt 
      ? <Payment amount={price} setPaymentSuccess={setPaymentSuccess}/> 
      : paymentSuccess ? <PaymentSuccess /> : <PaymentFail setPaymentAttempt={setPaymentAttempt}/> }
    </Elements>
  )
}
