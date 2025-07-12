"use client"


import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"
import { useProducts, useDeleteProduct } from "@/hooks/use-api"
import { Breadcrumb } from "../../_components/breadcrumb"
import { DataTable } from "@/components/ui/data-table"

export default function ProductsListPage() {
  const { data: products = [], isLoading } = useProducts()
  const deleteProduct = useDeleteProduct()

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
      render: (item: any) => `$${item.productId?.price || 8000}`,
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
      render: (item: any) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => deleteProduct.mutate(item._id)}
          disabled={deleteProduct.isPending}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
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
          <h1 className="text-2xl font-bold text-gray-900">Products List</h1>
          <Breadcrumb items={[{ label: "Dashboard" }, { label: "Products List" }, { label: "List" }]} />
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
