
"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

interface RegisterData {
  name: string
  email: string
  phone: string
  password: string
}

interface ApiResponse {
  success: boolean
  code: number
  message: string
  data?: {
    accessToken: string
    user: {
      _id: string
      name: string
      email: string
      role: string
    }
  }
}

const registerUser = async (data: RegisterData): Promise<ApiResponse> => {
  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    const contentType = response.headers.get("content-type") || ""
    const isJson = contentType.includes("application/json")
    const responseBody = isJson ? await response.json() : await response.text()

    if (!response.ok) {
      throw new Error(
        isJson ? responseBody.message || "Registration failed" : responseBody
      )
    }

    if (!isJson) throw new Error("Invalid JSON response from server")

    return responseBody as ApiResponse
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Network error occurred")
  }
}

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data: ApiResponse) => {
      toast.success(data.message || "Registration successful!")
      router.push("/otp?context=register&token=" + data.data?.accessToken)
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong")
    },
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match")
    }

    if (!formData.agreeTerms) {
      return toast.error("You must agree to the Terms & Conditions")
    }

    mutation.mutate({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
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
            className="w-full max-w-[300px] sm:max-w-[400px] h-auto object-contain"
            priority
          />
        </div>

        {/* Right Section: Form */}
        <Card className="w-full max-w-md sm:max-w-lg shadow-lg rounded-lg p-4 sm:p-6 bg-white">
          <CardHeader className="text-center md:text-left px-0 pt-0 pb-4">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2 justify-center md:justify-start">
              <h2 className="text-2xl sm:text-[32px] md:text-[40px] text-[#131313]">Create New Account</h2>
              <span role="img" aria-label="wave">👋</span>
            </CardTitle>
            <p className="text-sm sm:text-base text-[#424242] mt-2">
              Please fill in the form to continue
            </p>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="grid gap-4 sm:gap-6 px-0 pb-0">
              {[
                { id: "name", type: "text", label: "Name", placeholder: "Enter your full name" },
                { id: "email", type: "email", label: "Email Address", placeholder: "Enter your email address" },
                { id: "phone", type: "tel", label: "Phone Number", placeholder: "Enter your Phone Number" },
                { id: "password", type: "password", label: "Password", placeholder: "Enter your password" },
                { id: "confirmPassword", type: "password", label: "Confirm Password", placeholder: "Enter Confirm password" },
              ].map(({ id, type, label, placeholder }) => (
                <div key={id} className="grid gap-2">
                  <Label className="text-sm sm:text-[16px] md:text-[18px] text-[#131313] font-medium" htmlFor={id}>
                    {label}
                  </Label>
                  <Input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    required
                    value={formData[id as keyof typeof formData] as string}
                    onChange={(e) => handleInputChange(id, e.target.value)}
                    className="text-sm sm:text-[16px] md:text-[18px] text-[#131313] border border-[#616161] h-10 sm:h-12 rounded-[10px]"
                  />
                </div>
              ))}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(v) => handleInputChange("agreeTerms", v as boolean)}
                />
                <Label htmlFor="terms" className="text-sm sm:text-[14px] text-gray-600">
                  I agree to the Terms & Conditions
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#D9AD5E] text-[#131313] text-sm sm:text-[16px] md:text-[18px] font-bold hover:bg-[#D9AD5E]/90 h-10 sm:h-12 rounded-[10px]"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Creating account..." : "Sign Up"}
              </Button>

              <p className="text-sm sm:text-[14px] text-gray-600 text-center mt-4">
                Already have an account?{" "}
                <Link href="/login" className="text-sm sm:text-[14px] font-medium text-gray-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  )
}
