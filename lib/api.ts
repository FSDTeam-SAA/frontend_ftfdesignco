import { getSession, useSession } from "next-auth/react";

const BASE_URL = "https://ftfdesignco-backend.onrender.com/api/v1";
import axios from "axios";
import { EmployeeProfile } from "./types";

export const useAuthToken = () => {
  const { data: session } = useSession();
  return session?.accessToken as string;
};
// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Add request interceptor to attach token from next-auth session
api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    } else {
      console.warn("No token in session");
    }
    return config;
  },
  (error) => Promise.reject(error)
);
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
};

export async function employeorderhistory() {
  try {
    const res = await api.get(`/order/my-order`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error}`);
    }
  }
}

export async function employeecard() {
  try {
    const res = await api.get(`/cart/my-cart`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error}`);
    }
  }
}

// GET profile

export async function employeeprofile(): Promise<EmployeeProfile> {
  try {
    const res = await api.get(`/employee/profile`);
    return res.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch profile");
    }
    throw new Error("Unknown error occurred while fetching profile");
  }
}
// UPDATE profile

export async function updateEmployeeProfile(
  formData: Partial<EmployeeProfile>,
  imageFile?: File | null
): Promise<EmployeeProfile> {
  try {
    const fd = new FormData();
    fd.append("data", JSON.stringify(formData));
    if (imageFile) {
      fd.append("imageLink", imageFile);
    }

    const res = await api.post<EmployeeProfile>(`/employee/update`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to update profile");
    }
    throw new Error("Unknown error occurred while updating profile");
  }
}

//
export async function addtocart(productId: string, quantity: number) {
  try {
    const res = await api.post(`/cart/add-to-cart`, { productId, quantity });
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error}`);
    }
  }
}

export async function increment(productId: string) {
  try {
    const res = await api.post(`/cart/increment/${productId}`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error}`);
    }
  }
}

export async function dicrement(productId: string) {
  try {
    const res = await api.post(`/cart/decrement/${productId}`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error}`);
    }
  }
}

export const createApiUrl = (endpoint: string) => `${BASE_URL}${endpoint}`;
