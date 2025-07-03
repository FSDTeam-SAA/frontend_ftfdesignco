"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
// import { GiftBoxLogo } from "@/components/gift-box-logo"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Reset password data:", formData)
    router.push("/success")
  }

  return (
    <Card className="w-full max-w-md bg-white shadow-lg">
      <CardContent className="p-8">
        <div className="mb-6">
          <h2 className="text-xl font-medium text-gray-800 mb-1">Reset Password</h2>
          <p className="text-sm text-gray-600">Set your new password</p>
        </div>

        <div className="lg:hidden mb-6">
          {/* <GiftBoxLogo /> */}
        </div>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
              New Password
            </Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter your password"
              value={formData.newPassword}
              onChange={(e) => handleInputChange("newPassword", e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="confirmNewPassword" className="text-sm font-medium text-gray-700">
              Confirm New Password
            </Label>
            <Input
              id="confirmNewPassword"
              type="password"
              placeholder="Enter your confirm password"
              value={formData.confirmNewPassword}
              onChange={(e) => handleInputChange("confirmNewPassword", e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 mt-6">
            Continue
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
