"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
// import { GiftBoxLogo } from "@/components/gift-box-logo"

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

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sign Up submitted:", formData)
    // Simulate signup success and redirect
    router.push("/login") // Redirect to welcome/login page
  }

  return (
    <Card className="w-full max-w-md bg-white shadow-lg">
      <CardContent className="p-8">
        <div className="mb-6">
          <h2 className="text-xl font-medium text-gray-800 mb-1">Create New Account</h2>
          <p className="text-sm text-gray-600">Please enter details</p>
        </div>

        <div className="lg:hidden mb-6">
          {/* <GiftBoxLogo /> */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your Phone Number"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Enter Confirm password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="terms"
              checked={formData.agreeTerms}
              onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the Terms & Conditions
            </Label>
          </div>

          <Button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 mt-6">
            Sign Up
          </Button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <button onClick={() => router.push("/login")} className="text-blue-600 hover:underline">
            Sign In
          </button>
        </p>
      </CardContent>
    </Card>
  )
}
