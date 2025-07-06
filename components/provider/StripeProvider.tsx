"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function StripeProvider({
  children,
  clientSecret,
}: {
  children: React.ReactNode;
  clientSecret: string;
}) {
  console.log("StripeProvider clientSecret:", clientSecret);

  if (!clientSecret) {
    console.error("StripeProvider: clientSecret is missing");
    return <div>Loading payment provider...</div>;
  }

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe" as const,
    },
  };

  return <Elements stripe={stripePromise} options={options}>{children}</Elements>;
}