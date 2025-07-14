"use client"

import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { useOrders } from "@/hooks/use-api"
import { Breadcrumb } from "../_components/breadcrumb"

export default function OrderHistoryPage() {
  const { data: orders = [], isLoading } = useOrders()

  console.log(orders)

  const columns = [
    {
      key: "productName",
      header: "Product Name",
      render: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">EK</span>
          </div>
          <span className="font-medium">{item.productId?.title || "T-Shirt"}</span>
        </div>
      ),
    },
    {
      key: "coins",
      header: "Coins",
      render: (item: any) => item.coin || 200,
    },
    {
      key: "quantity",
      header: "Quantity",
      render: () => "02",
    },
    {
      key: "employeeId",
      header: "Employee Id",
      render: () => "17456",
    },
    {
      key: "date",
      header: "Date",
      render: () => (
        <div>
          <div>04/21/2025</div>
          <div className="text-sm text-gray-500">03:18pm</div>
        </div>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: () => (
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800">Approved</Badge>
          <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
          <Badge className="bg-red-100 text-red-800">Cancel</Badge>
        </div>
      ),
    },
  ]

  if (isLoading) {
    return <div>Loading...</div>
  }


  console.log(orders)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
        <Breadcrumb items={[{ label: "Dashboard" }, { label: "Order History" }]} />
      </div>

      <div className="bg-white rounded-lg border">
        <DataTable data={orders} columns={columns} />
      </div>
    </div>
  )
}
