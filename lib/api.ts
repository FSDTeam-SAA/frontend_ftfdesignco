import { getSession, useSession } from "next-auth/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
import axios from "axios";
import { EmployeeProfile, SalesResponse } from "./types";
import { OrdersResponse } from "./companytypes";

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
  image?: File | null
): Promise<EmployeeProfile> {
  try {
    const fd = new FormData();
    fd.append("data", JSON.stringify(formData));
    if (image) {
      fd.append("image", image);
    }
    console.log("fd", fd);
    const res = await api.patch<EmployeeProfile>(`/employee/update`, fd, {
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

// employ cart
export async function fetchemployecartdata() {
  try {
    const res = await api.get(`/cart/my-cart`);
    return res.data.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error}`);
    }
  }
}

export async function employeeaddtocart(productId: string, quantity: number) {
  try {
    const res = await api.post(`/cart/add-to-cart`, { productId, quantity });
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error}`);
    }
  }
}

export async function employeecardincrement(productId: string) {
  try {
    const res = await api.put(`/cart/increment/${productId}`);
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Something went wrong");
    }
  }
}

export async function employeecarddicrement(productId: string) {
  try {
    const res = await api.put(`/cart/decrement/${productId}`);
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Something went wrong");
    }
    throw error;
  }
}

// company salse
export async function fetchMySales(
  employeeId?: string
): Promise<SalesResponse> {
  let url = `/order/my-sales`;
  if (employeeId) url += `?employeeId=${employeeId}`;
  const res = await api.get<SalesResponse>(url);
  return res.data;
}

export async function fetchOrders(): Promise<OrdersResponse> {
  try {
    const res = await api.get(`/order/all-orders`);
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Something went wrong");
    }
    throw error;
  }
}
export async function orderStatus(employeId: string, status: string) {
  try {
    const res = await api.put(`/order/status/${employeId}`, {
      status,
    });
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Something went wrong");
    }
    throw error;
  }
}

export async function contactUs(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  address?: string;
}) {
  try {
    const res = await api.post(`/contract/send-message`, data);
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to Contact");
    }
    throw error;
  }
}

export async function employOrder(
  data: { country: string; zipCode: string; name: string; address: string }) {
  try {
    const res = await api.post(`/order/create-order`, data,);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to Contact");
    }
    throw error;
  }
}
export async function employOrderDelete(id: string) {
  try {
    const res = await api.delete(`/order/remove-rejected-order/${id}`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
}


// company payment 

export async function companyPyament(
  data: { type: string; totalProductPrice: number;shopId:string;}) {
  try {
    const res = await api.post(`/payment/create-payment`, data,);
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Something went wrong");
    }
    throw error;
  }
}



export const createApiUrl = (endpoint: string) => `${BASE_URL}${endpoint}`;
