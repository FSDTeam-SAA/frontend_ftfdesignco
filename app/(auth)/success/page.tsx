"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"
// import { GiftBoxLogo } from "@/components/gift-box-logo"

export default function SuccessPage() {
  const router = useRouter()

  const handleBackToLogin = () => {
    router.push("/login")
  }

  return (
    <>
      <div className="hidden lg:block opacity-50">
        {/* <GiftBoxLogo /> */}
      </div>

      <Card className="w-full max-w-md bg-white shadow-lg relative">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-xl font-medium text-gray-800 mb-1">Password Changed Successfully</h2>
            <p className="text-sm text-gray-600 mb-6">Your password has been updated successfully</p>

            <Button
              onClick={handleBackToLogin}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3"
            >
              Back to Login
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Overlay effect */}
      <div className="fixed inset-0 bg-black bg-opacity-20 pointer-events-none" />
    </>
  )
}
