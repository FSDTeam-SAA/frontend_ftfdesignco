"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, XCircle } from "lucide-react";

import StripeProvider from "./provider/StripeProvider";
import PaymentForm from "./shared/PaymentForm";

interface CheckoutFormProps {
  userId: string;
  planId: string;
  amount: number;
  type: "subscription" | "payOrder";
  onSuccess?: () => void;
  onCancel?: () => void;
}

const createPaymentIntent = async ({
  userId,
  planId,
  amount,
  token,
  type,
}: CheckoutFormProps & { token: string | undefined; type: string }) => {
  console.log("Creating payment intent with:", { userId, planId, amount });
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/create-payment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ userId, planId, amount, type }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create payment intent");
  }

  return response.json();
};

export default function CheckoutForm({
  userId,
  planId,
  amount,
  onSuccess,
  onCancel,
}: CheckoutFormProps) {
  const session = useSession();
  const token = session.data?.accessToken;
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("");

  const { mutate: createPaymentMutate, isPending: isCreating } = useMutation({
    mutationFn: () =>
      createPaymentIntent({
        userId,
        planId,
        amount,
        token,
        type: "subscription",
      }),
    onSuccess: (data) => {
      console.log("Payment intent created:", data);
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        setMessage("Invalid payment intent response. Please try again.");
      }
    },
    onError: (err: Error) => {
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

  if (isCreating) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        <span>Loading payment details...</span>
      </div>
    );
  }

  if (message && !clientSecret) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <XCircle className="h-4 w-4" />
        <AlertDescription className="text-red-800">{message}</AlertDescription>
      </Alert>
    );
  }

  return clientSecret ? (
    <StripeProvider clientSecret={clientSecret}>
      <PaymentForm
        amount={amount}
        clientSecret={clientSecret}
        token={token}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </StripeProvider>
  ) : null;
}
