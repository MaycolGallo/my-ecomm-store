import { loadStripe } from "@stripe/stripe-js";

//API_KEY_STRIPE
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);

export async function initiateCheckout({ lineItems } = {}) {
  const stripe = await stripePromise;
  stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin,
  });
}
