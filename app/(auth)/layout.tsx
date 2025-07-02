import type React from "react"
import "../../app/globals.css"
// import { GiftBoxLogo } from "@/components/gift-box-logo"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex items-center justify-center gap-12">
        <div className="hidden lg:block">
          {/* <GiftBoxLogo /> */}
        </div>
        {children}
      </div>
    </div>
  )
}
