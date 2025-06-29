"use client"

import type React from "react"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthLayout from "@/components/web_components/AuthLayout"

export default function ResetPasswordPage() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you'd send new password to your backend
    router.push("/login") // After reset, go back to login
  }

  return (
    <AuthLayout>
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>Create your new password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="Enter New Password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-new-password">Confirm New Password</Label>
              <Input id="confirm-new-password" type="password" placeholder="Enter confirm new password" required />
            </div>
            <Button type="submit" className="w-full bg-gratisswag-gold hover:bg-gratisswag-gold-hover">
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
