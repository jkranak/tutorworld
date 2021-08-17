import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';

interface Props {
  amount: number
  setPaymentSuccess: (success: boolean) => void
}

export const Payment = ({amount, setPaymentSuccess}: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let ROUTE = process.env.REACT_APP_PAYMENT;
    const cardElement = elements!.getElement(CardElement)
      const {error, paymentMethod} = await stripe!.createPaymentMethod({
        type: 'card',
        card: cardElement!
      }) 
    if(!error) {
    try {
        const id = paymentMethod?.id;
        const response = await axios.post(ROUTE!, { amount, id })
        if(response.data.success) {
            console.log('Successful payment')
            setPaymentSuccess(true)
        }
    } catch (error) {
        console.log('Error', error)
    }
  } else {
    setPaymentSuccess(false)
  }
}
  
  return (
    <>
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
