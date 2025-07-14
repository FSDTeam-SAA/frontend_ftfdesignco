"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "lucide-react"
import { useUserProfile, useUpdateProfile } from "@/hooks/use-profile-api"
import { Breadcrumb } from "../../_components/breadcrumb"
import { useSession } from "next-auth/react"
import { ProfileImageUpload } from "./_components/profile-image-upload"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const token = session?.accessToken

  // Fetch user profile
  const { data: profile, isLoading, error } = useUserProfile(token)
  const updateProfile = useUpdateProfile(token)

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    address: "",
  })

  // Update form data when profile is loaded
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        phone: profile.phone || "",
        gender: "",
        dateOfBirth: "",
        address: "",
      })
    }
  }, [profile])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile.mutate(formData)
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Loading state
  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  // Authentication check
  if (!token) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Authentication required</p>
        <p className="text-gray-400 text-sm mt-1">Please log in to view your profile.</p>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Error loading profile</p>
        <p className="text-gray-400 text-sm mt-1">{error.message}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <Breadcrumb items={[{ label: "Dashboard" }, { label: "Settings" }, { label: "Personal Information" }]} />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-8">
        {profile && token && (
          <ProfileImageUpload currentImage={profile.imageLink} userName={profile.name} token={token} />
        )}
        <div>
          <h2 className="text-xl font-semibold">{profile?.name || "User"}</h2>
          <p className="text-gray-600">{profile?.email}</p>
          <p className="text-sm text-gray-500 capitalize">{profile?.role?.replace("_", " ")}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="male" className="hover:text-[#f5b641] cursor-pointer">Male</SelectItem>
                <SelectItem value="female" className="hover:text-[#f5b641] cursor-pointer">Female</SelectItem>
                <SelectItem value="other" className="hover:text-[#f5b641] cursor-pointer">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <div className="relative">
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              />
              <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Enter your address"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (profile) {
                setFormData({
                  name: profile.name || "",
                  phone: profile.phone || "",
                  gender: "",
                  dateOfBirth: "",
                  address: "",
                })
              }
            }}
          >
            Reset
          </Button>
          <Button type="submit" className="bg-[#D9AD5E] hover:bg-[#f5b641] text-white" disabled={updateProfile.isPending}>
            {updateProfile.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}
