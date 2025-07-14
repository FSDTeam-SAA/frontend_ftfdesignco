
"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react" // Added for eye icons

interface ResetPasswordData {
  newPassword: string
}

async function resetPassword({ token, data }: { token: string; data: ResetPasswordData }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to reset password")
  }

  return response.json()
}

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || ""
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  })
  const [showNewPassword, setShowNewPassword] = useState(false) // State for new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false) // State for confirm password visibility

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      router.push("/success")
    },
    onError: (error) => {
      console.error("Password reset error:", error)
      // You can add error handling UI here, e.g., show a toast notification
    },
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Toggle visibility for new password
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword)
  }

  // Toggle visibility for confirm password
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.newPassword !== formData.confirmNewPassword) {
      console.error("Passwords do not match")
      return
    }
    mutation.mutate({
      token,
      data: { newPassword: formData.newPassword },
    })
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4 sm:p-6">
      <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12 w-full max-w-5xl">
        {/* Left Section: Branding */}
        <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-1/2 lg:w-2/5">
          <Image
            src="/assets/logo.png"
            alt="GratiSwag Logo"
            width={435}
            height={269}
            className="w-full max-w-[200px] sm:max-w-[400px] h-auto object-contain"
            priority
          />
        </div>

        {/* Right Section: Form */}
        <Card className="w-full max-w-md sm:max-w-lg shadow-lg rounded-lg p-4 sm:p-6 bg-white">
          <CardHeader className="text-center md:text-left px-0 pt-0 pb-4">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2 justify-center md:justify-start">
              <h2 className="text-2xl sm:text-[32px] md:text-[40px] text-[#131313]">Reset Password</h2>
              <span role="img" aria-label="wave">👋</span>
            </CardTitle>
            <p className="text-sm sm:text-base text-[#424242] mt-2">Set your new password</p>
          </CardHeader>

          <form onSubmit={handleResetPassword} className="space-y-4">
            <CardContent className="grid gap-4 sm:gap-6 px-0 pb-0">
              <div className="grid gap-2">
                <Label className="text-sm sm:text-[16px] md:text-[18px] text-[#131313] font-medium" htmlFor="newPassword">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange("newPassword", e.target.value)}
                    className="text-sm sm:text-[16px] md:text-[18px] text-[#131313] border border-[#616161] h-10 sm:h-12 rounded-[10px] pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleNewPasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-800"
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? <Eye className="h-5 w-5" />:  <EyeOff className="h-5 w-5" /> }
                  </button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label className="text-sm sm:text-[16px] md:text-[18px] text-[#131313] font-medium" htmlFor="confirmNewPassword">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmNewPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter your confirm password"
                    value={formData.confirmNewPassword}
                    onChange={(e) => handleInputChange("confirmNewPassword", e.target.value)}
                    className="text-sm sm:text-[16px] md:text-[18px] text-[#131313] border border-[#616161] h-10 sm:h-12 rounded-[10px] pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-800"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <Eye className="h-5 w-5" /> :  <EyeOff className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#D9AD5E] text-[#131313] text-sm sm:text-[16px] md:text-[18px] font-bold hover:bg-[#D9AD5E]/90 h-10 sm:h-12 rounded-[10px]"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Submitting..." : "Continue"}
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  )
}