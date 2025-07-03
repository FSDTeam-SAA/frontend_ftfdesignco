"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
// import { GiftBoxLogo } from "@/components/gift-box-logo"

export default function WelcomePage() {
  const router = useRouter()

  return (
    <Card className="w-full max-w-md bg-white shadow-lg">
      <CardContent className="p-8 text-center">
        <div className="mb-6">
          <h2 className="text-xl font-medium text-gray-800 mb-1">Welcome 👋</h2>
          <p className="text-sm text-gray-600">Please login here</p>
        </div>

        {/* <GiftBoxLogo /> */}

        <div className="space-y-3">
          <Button
            onClick={() => router.push("/company")}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3"
          >
            Company Login
          </Button>
          <Button
            onClick={() => router.push("/login/employee")}
            variant="outline"
            className="w-full border-gray-300 text-gray-700 font-medium py-3"
          >
            Employee Login
          </Button>
        </div>

        <p className="text-sm text-gray-600 mt-6">
          {"Don't have an account? "}
          <button onClick={() => router.push("/login/signup")} className="text-blue-600 hover:underline">
            Sign Up
          </button>
        </p>
      </CardContent>
    </Card>
  )
}
