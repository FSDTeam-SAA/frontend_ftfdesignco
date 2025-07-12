"use client"

import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Plus } from "lucide-react"
import { useProducts } from "@/hooks/use-api"
import { Breadcrumb } from "../../_components/breadcrumb"

export default function ProductsStatusPage() {
  const { data: products = [], isLoading } = useProducts()

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
      key: "price",
      header: "Price",
      render: (item: any) => `$${item.productId?.price || 5000}`,
    },
    {
      key: "quantity",
      header: "Quantity",
      render: (item: any) => item.productId?.quantity || 100,
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
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: any) => (
        <Badge
          variant={item.status === "pending" ? "secondary" : "default"}
          className={item.status === "pending" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}
        >
          {item.status === "pending" ? "Pending" : "Approved"}
        </Badge>
      ),
    },
  ]

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Request for Products</h1>
          <Breadcrumb items={[{ label: "Dashboard" }, { label: "Request for Products" }]} />
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="h-4 w-4 mr-2" />
          Add Resource
        </Button>
      </div>

      <div className="bg-white rounded-lg border">
        <DataTable data={products} columns={columns} />
      </div>
    </div>
  )
}
