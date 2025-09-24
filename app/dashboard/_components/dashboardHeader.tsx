"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUserProfile } from "@/hooks/use-api"

export function DashboardHeader() {
  const { data: profile } = useUserProfile()
  // console.log(profile)

  // console.log(profile)

  return (
    <header className="bg-[#035F8A] border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-white">{profile?.name || "Mr. Raja"}</span>
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile?.imageLink || ""} />
            <AvatarFallback>{profile?.name?.charAt(0) || "R"}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
