"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AuthLayout from "@/components/web_components/AuthLayout"
import { OtpInput } from "@/components/web_components/OtpInput"

function OtpPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || "your registered email address"
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Verifying OTP:", otp.join(""))
    router.push("/reset-password")
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Enter OTP</CardTitle>
        <CardDescription>
          We have shared a code to{" "}
          <span className="font-semibold text-foreground">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <OtpInput length={6} value={otp} onChange={setOtp} />
          <Button type="submit" className="w-full bg-gratisswag-gold hover:bg-gratisswag-gold-hover">
            Verify
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Remember your password?{" "}
          <Button
            variant="link"
            className="p-0 h-auto text-sm underline"
            onClick={() => router.push("/login")}
          >
            Sign In
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function EnterOtpPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div className="text-center">Loading OTP screen...</div>}>
        <OtpPageContent />
      </Suspense>
    </AuthLayout>
  )
}
