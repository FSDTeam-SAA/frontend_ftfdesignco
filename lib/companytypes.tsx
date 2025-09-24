import { Employee } from "./types";

export interface OrderItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  totalCoin: number;
  image: string;
  productId: string;
}

export interface Order {
  _id: string;
  employee: Employee;
  shop: string;
  items: OrderItem[];
  status: string;
  country: string;
  zipCode: number;
  name: string;
  address: string;
  totalPayCoin: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse {
  success: boolean;
  code: number;
  message: string;
  data: Order[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
