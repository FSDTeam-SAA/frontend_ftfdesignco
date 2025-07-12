import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthToken, createApiUrl, apiEndpoints } from "@/lib/api"

interface Product {
  _id: string
  productId: {
    _id: string
    title: string
    price: number
    quantity: number
    category: {
      _id: string
      title: string
    }
  }
  userId: {
    _id: string
    name: string
    email: string
  }
  shopId?: {
    _id: string
    companyId: string
    companyName: string
    comapnyAddress: string
  }
  coin: number
  status: string
}

interface Employee {
  _id: string
  name: string
  email: string
  employeeId: string
  role: string
  coin: number
  shop: {
    _id: string
    companyId: string
    companyName: string
  }
  userId: {
    _id: string
    name: string
    email: string
  }
}

interface UserProfile {
  _id: string
  name: string
  email: string
  phone?: string
  address?: string
  company?: string
  gender?: string
  dateOfBirth?: string
}

export const useProducts = () => {
  const token = useAuthToken()

  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(createApiUrl(apiEndpoints.assignedProducts), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }

      const data = await response.json()
      return data.data as Product[]
    },
    enabled: !!token,
  })
}

export const useDeleteProduct = () => {
  const token = useAuthToken()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (productId: string) => {
      const response = await fetch(createApiUrl(apiEndpoints.deleteProduct(productId)), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete product")
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}

export const useOrders = () => {
  const token = useAuthToken()

  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await fetch(createApiUrl(apiEndpoints.allOrders), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch orders")
      }

      const data = await response.json()
      return data.data as Product[]
    },
    enabled: !!token,
  })
}

export const useEmployees = () => {
  const token = useAuthToken()

  return useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await fetch(createApiUrl(apiEndpoints.getEmployees), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch employees")
      }

      const data = await response.json()
      return data.data as Employee[]
    },
    enabled: !!token,
  })
}

export const useCreateEmployee = () => {
  const token = useAuthToken()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (employeeData: any) => {
      const response = await fetch(createApiUrl(apiEndpoints.createEmployee), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      })

      if (!response.ok) {
        throw new Error("Failed to create employee")
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] })
    },
  })
}

export const useUserProfile = () => {
  const token = useAuthToken()

  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await fetch(createApiUrl(apiEndpoints.getProfile), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch profile")
      }

      const data = await response.json()
      return data.data as UserProfile
    },
    enabled: !!token,
  })
}

export const useUpdateProfile = () => {
  const token = useAuthToken()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (profileData: Partial<UserProfile>) => {
      const response = await fetch(createApiUrl(apiEndpoints.updateProfile), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      })

      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] })
    },
  })
}

export const useChangePassword = () => {
  const token = useAuthToken()

  return useMutation({
    mutationFn: async (passwordData: { currentPassword: string; newPassword: string }) => {
      const response = await fetch(createApiUrl(apiEndpoints.changePassword), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordData),
      })

      if (!response.ok) {
        throw new Error("Failed to change password")
      }

      return response.json()
    },
  })
}
