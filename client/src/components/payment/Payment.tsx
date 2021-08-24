import {FC, FormEvent, useState} from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import {addOneSession} from '../../services/apiUser';

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

const CARD_OPTIONS = {
	style: {
		base: {
			iconColor: "#001420",
			color: "#001420",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#001420" },
			"::placeholder": { color: "#001420" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export const Payment: FC<Props> = ({sessionInfo, setPaymentSuccess, setPaymentAttempt}: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [additionalInfo, setAdditionalInfo] = useState('');
  
  const handleChange = (event: {target: {value: string}}) => {
    setAdditionalInfo(event.target.value)
  }

  const handleSubmit = async (event: FormEvent) => {
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
        if(response.data.status === 'succeeded') {
            setPaymentAttempt(true);
            setPaymentSuccess(true);
            const {tutorId, price, topic, time, day} = sessionInfo;
            addOneSession(Number(tutorId), day, time, price, `Topic/level: ${topic}, Additional Info: ${additionalInfo}`)
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
    <div className="payment form">
      <h1 className="payment__title">Confirm your purchase</h1>
      <div className="payment__details">
        <p>Payment: ${sessionInfo.price}</p>
        <p>For a {sessionInfo.topic} tutoring session</p>
        <p>on {new Date(`${sessionInfo.day}T00:00:00`).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})} at {sessionInfo.time}</p>
        <p>with {sessionInfo.name}</p>
        <form onSubmit={handleSubmit}>
          <div className="payment__details--additional">
            <label>Additional indivation on what you want to cover during your session</label>
            <textarea id="additionalInfo" name="additionalInfo" onChange={handleChange} value={additionalInfo}  className="text-input text-input--blue"/>
          </div>
          <fieldset className="fieldset">
            <CardElement options={CARD_OPTIONS}/>
          </fieldset>
          <button onClick={handleSubmit} className="btn btn--blue form--btn">Pay</button>
        </form>
      </div>
    </div>

  )
}
