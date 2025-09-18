// import { profile } from "console";

// employe order histoy
export interface Employee {
  employeeId?: string;
  name?: string;
  _id?: string;
  email?: string;
}

export interface Product {
  price?: number;
  title?: string;
  _id?: string;
}

export interface Shop {
  companyId?: string;
  companyName?: string;
  _id?: string;
}

export type OrderStatus = "approved" | "cancelled" | "pending" | "delivered";

export interface Order {
  _id?: string;
  employeeId?: Employee;
  productId?: Product;
  shopId?: Shop;
  status?: OrderStatus;
  __v?: number;
}

export interface Pagination {
  totalOrders?: number;
  currentPage?: number;
  totalPages?: number;
  limit?: number;
}

export interface OrdersResponse {
  data?: Order[];
  message?: string;
  pagination?: Pagination;
}

// employe order histoy  end


// employe profile

// types/employee.ts
export interface CartItem {
  quantity: number;
  totalCoin: number;
  productId: string;
  _id: string;
}

export interface EmployeeProfile {
  _id: string;
  name: string;
  email: string;
  employeeId: string;
  password: string;
  needPasswordChange: boolean;
  imageLink: string | null;
  role: string;
  coin: number;
  remainingCoin: number;
  totalOrder: number;
  city: string;
  country: string;
  roadOrArea: string;
  shop: Shop;
  userId: string;
  cartData: Record<string, CartItem>;
  __v: number;

  // Optional fields (not in API, but you had them originally)
  phone?: string;
  postalCode?: string;
  companyAddress?: string;
}

// dashboard company salse

// export interface Employee {
//   employeeId: string;
//   name: string;
//   email: string;
// }

export interface SaleItem {
  productName: string;
  quantity: number;
  coins: number;
  totalPrice: number;
  image: string;
  employees: Employee[];
}

export interface SalesPagination {
  totalOrders: number;
  currentPage: number;
  totalPages: number;
  limit: number;
}

export interface SalesResponse {
  success: boolean;
  code: number;
  message: string;
  pagination: SalesPagination;
  totalProducts: number;
  totalUserCoin: number;
  totalProductPrice: number;
  data: SaleItem[];
}
