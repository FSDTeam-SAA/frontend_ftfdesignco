"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
// import { GiftBoxLogo } from "@/components/gift-box-logo"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Forgot password email:", email)
    router.push("/otp")
  }

  return (
    <Card className="w-full max-w-md bg-white shadow-lg">
      <CardContent className="p-8">
        <div className="mb-6">
          <h2 className="text-xl font-medium text-gray-800 mb-1">Forgot Password</h2>
          <p className="text-sm text-gray-600">
            Enter your registered email address, we&apos;ll send you a code to reset your password
          </p>
        </div>

        <div className="lg:hidden mb-6">
          {/* <GiftBoxLogo /> */}
        </div>

        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 mt-6">
            Send OTP
          </Button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          <button onClick={() => router.push("/login")} className="text-blue-600 hover:underline">
            Back to Login
          </button>
        </p>
      </CardContent>
    </Card>
  )
}
