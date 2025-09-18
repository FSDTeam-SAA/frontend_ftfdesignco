"use client";

import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "../_components/breadcrumb";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchOrders, orderStatus } from "@/lib/api";
import { Order } from "@/lib/companytypes";
import { toast } from "sonner";

export default function OrderHistoryPage() {
  const { data: ordersResponse, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetchOrders(),
  });
  const queryClient = useQueryClient();

  const orderMutation = useMutation({
    mutationKey: ["orders"],
    mutationFn: ({ Id, status }: { Id: string; status: string }) =>
      orderStatus(Id, status),
    onSuccess: (data) => {
      toast.success(`${data.message}`)
     queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError:(error)=>{
      toast.error(`${error}`)

    }
  });

  const handelstatus = (Id: string, status: string) => {
    orderMutation.mutate({ Id, status });
  };
  if (isLoading) return <div>Loading...</div>;

  // Pass only the array of orders to the DataTable
  const orders: Order[] = ordersResponse?.data || [];

  const columns = [
    {
      key: "productName",
      header: "Product Name",
      render: (order: Order) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">EK</span>
          </div>
          {/* Display first item's title for this order */}
          <span className="font-medium">
            {order.items?.[0]?.title || "T-Shirt"}
          </span>
        </div>
      ),
    },
    {
      key: "coins",
      header: "Coins",
      render: (order: Order) => order.totalPayCoin || 0,
    },
    {
      key: "quantity",
      header: "Quantity",
      render: (order: Order) =>
        order.items?.reduce((sum, i) => sum + i.quantity, 0) || 0,
    },
    {
      key: "employeeId",
      header: "Employee Id",
      render: (order: Order) => order.employee,
    },
    {
      key: "date",
      header: "Date",
      render: (order: Order) => {
        const date = new Date(order.createdAt);
        return (
          <div>
            <div>{date.toLocaleDateString()}</div>
            <div className="text-sm text-gray-500">
              {date.toLocaleTimeString()}
            </div>
          </div>
        );
      },
    },
    {
      key: "action",
      header: "Action",
      render: (order: Order) => (
        <div className="flex items-center gap-2">
          <Badge
            onClick={() => handelstatus(order._id, "approved")}
            className="bg-green-100 text-green-800 cursor-pointer"
          >
            Approved
          </Badge>
          <Badge
            onClick={() => handelstatus(order._id, "delivered")}
            className="bg-blue-100 text-blue-800 cursor-pointer"
          >
            Processing
          </Badge>
          <Badge
            onClick={() => handelstatus(order._id, "rejected")}
            className="bg-red-100 text-red-800 cursor-pointer"
          >
            Cancel
          </Badge>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
        <Breadcrumb
          items={[{ label: "Dashboard" }, { label: "Order History" }]}
        />
      </div>

      <div className="bg-white rounded-lg border">
        <DataTable data={orders} columns={columns} />
      </div>
    </div>
  );
}
