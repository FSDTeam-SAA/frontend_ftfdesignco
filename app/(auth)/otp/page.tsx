"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
// import { GiftBoxLogo } from "@/components/gift-box-logo"

export default function OtpPage() {
  const router = useRouter()
  const [otp, setOtp] = useState(["", "", "", "", "", ""])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("OTP entered:", otp.join(""))
    router.push("/reset-password")
  }

  return (
    <Card className="w-full max-w-md bg-white shadow-lg">
      <CardContent className="p-8">
        <div className="mb-6">
          <h2 className="text-xl font-medium text-gray-800 mb-1">Enter OTP</h2>
          <p className="text-sm text-gray-600">
            We have share a code of your registered email address
            <br />
            robert@example.com
          </p>
        </div>

        <div className="lg:hidden mb-6">
          {/* <GiftBoxLogo /> */}
        </div>

        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-12 h-12 text-center text-lg font-semibold"
                required
              />
            ))}
          </div>

          <Button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3">
            Verify
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
