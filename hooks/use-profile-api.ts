import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const API_BASE_URL = "https://ftfdesignco-backend.onrender.com/api/v1"

interface UserProfile {
  _id: string
  name: string
  email: string
  phone: string
  isVerified: boolean
  imageLink: string | null
  role: string
  isShopCreated: boolean
  isPaid: boolean
  employeeCount: number
  createdAt: string
  updatedAt: string
  shop: string
}

interface UpdateProfileData {
  name: string
  phone: string
  gender?: string
  dateOfBirth?: string
  address?: string
}

interface ChangePasswordData {
  currentPassword: string
  newPassword: string
}

// Get user profile
export function useUserProfile(token: string | undefined) {
  return useQuery<UserProfile>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!token) throw new Error("No authentication token")

      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.statusText}`)
      }

      const data = await response.json()
      return data.data as UserProfile
    },
    enabled: !!token,
    retry: 1,
  })
}

// Update user profile
export function useUpdateProfile(token: string | undefined) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (profileData: UpdateProfileData) => {
      if (!token) throw new Error("No authentication token")

      const response = await fetch(`${API_BASE_URL}/user/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      })

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.statusText}`)
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] })
      toast.success("Profile updated successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile")
    },
  })
}

// Upload profile image
export function useUploadProfileImage(token: string | undefined) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (file: File) => {
      if (!token) throw new Error("No authentication token")

      const formData = new FormData()
      formData.append("image", file)

      const response = await fetch(`${API_BASE_URL}/user/update-profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Failed to upload image: ${response.statusText}`)
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] })
      toast.success("Profile image updated successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to upload image")
    },
  })
}

// Change password
export function useChangePassword(token: string | undefined) {
  return useMutation({
    mutationFn: async (passwordData: ChangePasswordData) => {
      if (!token) throw new Error("No authentication token")

      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      })

      if (!response.ok) {
        throw new Error(`Failed to change password: ${response.statusText}`)
      }

      return response.json()
    },
    onSuccess: () => {
      toast.success("Password changed successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to change password")
    },
  })
}
