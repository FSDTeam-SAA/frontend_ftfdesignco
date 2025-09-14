// employe order histoy
export interface Employee {
  employeeId?: string;
  name?: string;
  _id?: string;
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
