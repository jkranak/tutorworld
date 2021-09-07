const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const  stripePayment = async (req: any, res: any) => {
  let {amount, id} = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'Tutoring session',
      payment_method: id,
      confirm: true
    })
    res.json({
      status: payment.status,
      amount: payment.amount
    })
  } catch (err) {
    console.log(err)
    res.json({
      message: 'Payment failed',
      success: false
    })
  }
}