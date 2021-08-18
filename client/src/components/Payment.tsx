import {FC} from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';

interface Props {
  sessionInfo: {
    tutorId: number, 
    price: number, 
    topic: string,
    time: string,
    day: string,
    name: string
  }
  setPaymentSuccess: (success: boolean) => void
  setPaymentAttempt: (attempt: boolean) => void
}

export const Payment: FC<Props> = ({sessionInfo, setPaymentSuccess, setPaymentAttempt}: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let ROUTE = `${process.env.REACT_APP_API_URL}/payment`;
    const cardElement = elements!.getElement(CardElement)
      const {error, paymentMethod} = await stripe!.createPaymentMethod({
        type: 'card',
        card: cardElement!
      }) 
    if(!error) {
    try {
        const id = paymentMethod?.id;
        const amount = sessionInfo.price * 100;
        const response = await axios.post(ROUTE!, { amount, id })
        if(response.data.success) {
            setPaymentAttempt(true);
            setPaymentSuccess(true)
        }
    } catch (error) {
        console.log('Error', error)
    }
  } else {
    setPaymentAttempt(true);
    setPaymentSuccess(false)
  }
}
  
  return (
    <>
    <p>Payment: ${sessionInfo.price}</p>
    <p>For a {sessionInfo.topic} tutoring session</p>
    <p>on {new Date(sessionInfo.day).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})} at {sessionInfo.time}</p>
    <p>with {sessionInfo.name}</p>
    <form onSubmit={handleSubmit}></form>
    <fieldset>
      <div>
        <CardElement />
      </div>
    </fieldset>
    <button onClick={handleSubmit}>Pay</button>
    </>

  )
}
