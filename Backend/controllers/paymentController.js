import Stripe from "stripe";
const stripe = new Stripe(process.env.sk_test); // from .env

export const createPaymentIntent = async (req, res) => {
  const { items } = req.body;
  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0) * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
    automatic_payment_methods: { enabled: true },
  });

  res.json({ clientSecret: paymentIntent.client_secret });
};
