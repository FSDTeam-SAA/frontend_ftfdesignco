import { useSession } from "next-auth/react"

const BASE_URL = "https://ftfdesignco-backend.onrender.com/api/v1"

export const useAuthToken = () => {
  const { data: session } = useSession()
  return session?.accessToken as string
}

export const apiEndpoints = {
  // Products
  assignedProducts: "/assigned-product/my-shop",
  deleteProduct: (id: string) => `/assigned-product/${id}`,

  // Orders
  allOrders: "/order/all-orders",
  orderStatus: (id: string) => `/order/status/${id}`,

  // Employee
  createEmployee: "/employee/create-employee",
  getEmployees: "/employee",

  // Auth & Profile
  changePassword: "/auth/change-password",
  getProfile: "/user/profile",
  updateProfile: "/user/update-profile",
}

export const createApiUrl = (endpoint: string) => `${BASE_URL}${endpoint}`
