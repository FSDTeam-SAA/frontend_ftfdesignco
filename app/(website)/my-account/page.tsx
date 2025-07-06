"use client"

import { useState } from "react"
import { User, Lock, LogOut } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { cn } from "@/lib/utils"
import PersonalInformationForm from "@/components/web_components/personal-information-form"
import ChangePasswordForm from "@/components/web_components/change-password-form"
import { signOut } from "next-auth/react"

export default function AccountsPage() {
  const [activeTab, setActiveTab] = useState("personal-information")

  return (
    <div className=" py-8 px-4 sm:px-6 lg:px-8">
      <div className=" container mx-auto  p-6 ">
        <h1 className="text-3xl font-bold text-center mb-8">Accounts</h1>
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
          {/* Left Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Profile Card */}
            <Card className="p-6 flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 mb-4 border-2 border-gray-200">
                <AvatarImage src="/placeholder-user.jpg" alt="Bessie Edwards" />
                <AvatarFallback>BE</AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-semibold">Bessie Edwards</h2>
              <p className="text-sm text-gray-500">darrellsteward@gmail.com</p>
              <p className="text-sm text-gray-500 mt-2">
                ID: <span className="font-medium">12456548</span>
              </p>
              <p className="text-sm text-gray-500">
                Co ID : <span className="font-medium text-orange-600">588</span>
              </p>
            </Card>

            {/* Navigation */}
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                className={cn(
                  "justify-start px-4 py-2 text-base",
                  activeTab === "personal-information" && "bg-gray-100 text-gray-900 font-semibold",
                )}
                onClick={() => setActiveTab("personal-information")}
              >
                <User className="w-5 h-5 mr-3" />
                Personal Information
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "justify-start px-4 py-2 text-base",
                  activeTab === "change-password" && "bg-gray-100 text-gray-900 font-semibold",
                )}
                onClick={() => setActiveTab("change-password")}
              >
                <Lock className="w-5 h-5 mr-3" />
                Change Password
              </Button>
              <Button
                variant="ghost"
                className="justify-start px-4 py-2 text-base text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={() => signOut( { callbackUrl: "/" })}
              >
                <LogOut className="w-5 h-5 mr-3" />
                Log out
              </Button>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1">
            {activeTab === "personal-information" && <PersonalInformationForm />}
            {activeTab === "change-password" && <ChangePasswordForm />}
          </div>
        </div>
      </div>
    </div>
  )
}
