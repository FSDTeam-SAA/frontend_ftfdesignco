"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle } from "lucide-react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import StripeProvider from "./provider/StripeProvider"

interface CheckoutFormProps {
  userId: string
  planId: string
  amount: number
  onSuccess?: () => void
  onCancel?: () => void
}

const createPaymentIntent = async ({
  userId,
  planId,
  amount,
  token,
}: CheckoutFormProps & { token: string | undefined }) => {
  console.log("Creating payment intent with:", { userId, planId, amount })
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/payment/create-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ userId, planId, amount }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Failed to create payment intent")
  }

  return response.json()
}

const confirmPayment = async ({
  paymentIntentId,
  token,
}: {
  paymentIntentId: string
  token: string | undefined
}) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/payment/confirm-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ paymentIntentId }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Failed to confirm payment")
  }

  return response.json()
}

function PaymentForm({
  amount,
  clientSecret,
  token,
  onSuccess,
  onCancel,
}: {
  amount: number
  clientSecret: string
  token: string | undefined
  onSuccess?: () => void
  onCancel?: () => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info")
  const [isPaymentElementReady, setIsPaymentElementReady] = useState(false)

  const { mutate: confirmPaymentMutate } = useMutation({
    mutationFn: ({
      paymentIntentId,
      token,
    }: {
      paymentIntentId: string
      token: string | undefined
    }) => confirmPayment({ paymentIntentId, token }),
    onSuccess: () => {
      console.log("Payment confirmed successfully")
      setMessage("Payment confirmed successfully! Your subscription is now active.")
      setMessageType("success")
      setLoading(false)
      setTimeout(() => {
        onSuccess?.()
      }, 2000)
    },
    onError: (err: Error) => {
      console.error("Error confirming payment:", err.message)
      setMessage(err.message || "Failed to confirm payment.")
      setMessageType("error")
      setLoading(false)
    },
  })

  useEffect(() => {
    if (!elements) return
    const paymentElement = elements.getElement("payment")
    if (paymentElement) {
      setIsPaymentElementReady(true)
    }
  }, [elements])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements || !clientSecret || !isPaymentElementReady) {
      setMessage("Payment provider or elements not ready. Please try again.")
      setMessageType("error")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: "if_required",
      })

      if (error) {
        setMessage(error.message || "An error occurred during payment")
        setMessageType("error")
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setMessage("Payment succeeded!")
        setMessageType("success")
        confirmPaymentMutate({ paymentIntentId: paymentIntent.id, token })
      } else {
        setMessage("Payment status: " + paymentIntent?.status)
        setMessageType("info")
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("An unexpected error occurred")
      setMessage(error.message)
      setMessageType("error")
    } finally {
      setLoading(false)
    }
  }

  const getAlertIcon = () => {
    switch (messageType) {
      case "success":
        return <CheckCircle className="h-4 w-4" />
      case "error":
        return <XCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="min-h-[200px]">
        <PaymentElement
          onReady={() => setIsPaymentElementReady(true)}
          options={{
            layout: "tabs",
          }}
        />
      </div>

      {message && (
        <Alert
          className={
            messageType === "error"
              ? "border-red-200 bg-red-50"
              : messageType === "success"
                ? "border-green-200 bg-green-50"
                : ""
          }
        >
          {getAlertIcon()}
          <AlertDescription
            className={messageType === "error" ? "text-red-800" : messageType === "success" ? "text-green-800" : ""}
          >
            {message}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onCancel} disabled={loading} className="flex-1 bg-transparent rounded-xl hover:bg-green-300 hover:text-white">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!stripe || !elements || !isPaymentElementReady || loading}
          className="flex-1 bg-[#28A745] text-white hover:bg-green-300  rounded-xl"
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Processing..." : `Pay $${amount}`}
        </Button>
      </div>
    </div>
  )
}

export default function CheckoutForm({ userId, planId, amount, onSuccess, onCancel }: CheckoutFormProps) {
  const session = useSession()
  const token = session.data?.accessToken
  const [clientSecret, setClientSecret] = useState("")
  const [message, setMessage] = useState("")

  const { mutate: createPaymentMutate, isPending: isCreating } = useMutation({
    mutationFn: () => createPaymentIntent({ userId, planId, amount, token }),
    onSuccess: (data) => {
      console.log("Payment intent created:", data)
      if (data.clientSecret) {
        setClientSecret(data.clientSecret)
      } else {
        setMessage("Invalid payment intent response. Please try again.")
      }
    },
    onError: (err: Error) => {
      console.error("Error creating payment intent:", err.message)
      setMessage(err.message || "Failed to create payment. Please try again.")
    },
  })

  useEffect(() => {
    if (userId && token) {
      createPaymentMutate()
    } else {
      setMessage("User authentication required. Please log in.")
    }
  }, [createPaymentMutate, userId, token])

  if (isCreating) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        <span>Loading payment details...</span>
      </div>
    )
  }

  if (message && !clientSecret) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <XCircle className="h-4 w-4" />
        <AlertDescription className="text-red-800">{message}</AlertDescription>
      </Alert>
    )
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
  ) : null
}