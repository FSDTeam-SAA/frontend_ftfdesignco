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
  _id: string;
  employee: string; // employeeId was actually just a string ID in your response
  shop: string;     // shopId was also just a string ID
  items: OrderItem[]; // contains products in the order
  status: OrderStatus;
  name?: string;
  address?: string;
  country?: string;
  zipCode?: string | null;
  totalPayCoin?: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface OrderItem {
  _id: string;
  productId: string; // reference to product
  title: string;
  image: string;
  price: number;
  quantity: number;
  totalCoin: number;
}

// export type OrderStatus = "pending" | "approved" | "delivered" | "rejected";


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


//company dashboard sales
// export interface Employee {
//   employeeId: string;
//   name?: string;
// }

export interface SaleItem {
  id: string;
  employees: Employee[];
  productName: string;
  image: string;
  quantity: number;
  coins: number;
  totalPrice: number;
}

export interface SalesData {
  data: SaleItem[];
  totalProducts: number;
  totalUserCoin: number;
  totalProductPrice: number;
}

export interface PaymentPayload {
  type: string;
  totalProductPrice: number;
  shopId: string;
}

export interface SalesStatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  className?: string;
}

export interface SalesTableColumn<T = SaleItem> {
  key: string;
  header: string;
  render: (item: T) => React.ReactNode;
}

export interface SalesComponentProps {
  title?: string;
  showPaymentButton?: boolean;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onPayment?: (payload: PaymentPayload) => void;
  onSearch?: (query: string) => void;
  customColumns?: SalesTableColumn[];
  className?: string;
}
