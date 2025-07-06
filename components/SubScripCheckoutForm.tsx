"use client";

import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import StripeProvider from "@/components/provider/StripeProvider";

interface SubScripCheckoutFormProps {
  userId: string;
  planId: string;
  amount: number;
}

const createPaymentIntent = async ({
  userId,
  planId,
  amount,
  token,
}: SubScripCheckoutFormProps & { token: string | undefined }) => {
  console.log("Creating payment intent with:", { userId, planId, amount });
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/create-payment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ userId, planId, amount }),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create payment intent");
  }
  return response.json();
};

const confirmPayment = async ({
  paymentIntentId,
  token,
}: {
  paymentIntentId: string;
  token: string | undefined;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/confirm-payment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ paymentIntentId }),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to confirm payment");
  }
  return response.json();
};

function PaymentForm({
  amount,
  clientSecret,
  token,
}: {
  amount: number;
  clientSecret: string;
  token: string | undefined;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isPaymentElementReady, setIsPaymentElementReady] = useState(false);

  const { mutate: confirmPaymentMutate } = useMutation({
    mutationFn: ({
      paymentIntentId,
      token,
    }: {
      paymentIntentId: string;
      token: string | undefined;
    }) => confirmPayment({ paymentIntentId, token }),
    onSuccess: () => {
      console.log("Payment confirmed successfully");
      setMessage("Payment confirmed successfully");
      setLoading(false);
    },
    onError: (err: any) => {
      console.error("Error confirming payment:", err.message);
      setMessage(err.message || "Failed to confirm payment.");
      setLoading(false);
    },
  });

  // Check if PaymentElement is ready
  useEffect(() => {
    if (!elements) return;

    const paymentElement = elements.getElement("payment");
    if (paymentElement) {
      setIsPaymentElementReady(true);
    }
  }, [elements]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret || !isPaymentElementReady) {
      setMessage("Payment provider or elements not ready. Please try again.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: "if_required",
      });

      if (error) {
        setMessage(error.message || "An error occurred during payment");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setMessage("Payment succeeded!");
        confirmPaymentMutate({ paymentIntentId: paymentIntent.id, token });
      } else {
        setMessage("Payment status: " + paymentIntent?.status);
      }
    } catch (err: any) {
      setMessage(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <PaymentElement onReady={() => setIsPaymentElementReady(true)} />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!stripe || !elements || !isPaymentElementReady || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300 w-full"
      >
        {loading ? "Processing..." : `Pay $${amount}`}
      </button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}

export default function CheckoutForm({
  userId,
  planId,
  amount,
}: SubScripCheckoutFormProps) {
  const session = useSession();
  const token = session.data?.accessToken;
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("");

  const { mutate: createPaymentMutate, isPending: isCreating } = useMutation({
    mutationFn: () => createPaymentIntent({ userId, planId, amount, token }),
    onSuccess: (data) => {
      console.log("Payment intent created:", data);
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        setMessage("Invalid payment intent response. Please try again.");
      }
    },
    onError: (err: any) => {
      console.error("Error creating payment intent:", err.message);
      setMessage(err.message || "Failed to create payment. Please try again.");
    },
  });

  useEffect(() => {
    if (userId && token) {
      createPaymentMutate();
    } else {
      setMessage("User authentication required. Please log in.");
    }
  }, [createPaymentMutate, userId, token]);

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Complete Your Payment</h2>
      {clientSecret ? (
        <StripeProvider clientSecret={clientSecret}>
          <PaymentForm
            amount={amount}
            clientSecret={clientSecret}
            token={token}
          />
        </StripeProvider>
      ) : (
        <p>
          {isCreating
            ? "Loading payment details..."
            : message || "Loading payment details..."}
        </p>
      )}
    </div>
  );
}
