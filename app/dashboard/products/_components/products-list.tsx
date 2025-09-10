"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Trash2, Edit, RefreshCw } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { toast, Toaster } from "sonner"
import { Breadcrumb } from "../../_components/breadcrumb"
import { EditCoinModal } from "./edit-coin-modal"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export interface Product {
  _id: string
  product: {
    _id: string
    title: string
    price: number
    quantity: number
    productImage: string
    category: {
      _id: string
      title: string
    }
  }
  userId: string
  shopId: {
    _id: string
    companyId: string
    companyName: string
  }
  coin: number
  status: "pending" | "approved" | "rejected"
  __v: number
}

interface ApiResponse {
  success: boolean
  code: number
  message: string
  data: Product[] | null
}

export default function ProductsList() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<{ id: string; name: string } | null>(null)
  const queryClient = useQueryClient()
  const session = useSession()
  const token = session?.data?.accessToken

  // Fetch products query
  const {
    data: apiResponse,
    isLoading,
    error,
    refetch,
  }: UseQueryResult<ApiResponse, Error> = useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<ApiResponse> => {
      if (!token) return {
        success: false,
        code: 401,
        message: "Unauthorized",
        data: null
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/assigned-product/my-shop`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`)
      }

      return response.json()
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    enabled: !!token,
  })

  console.log(apiResponse)

  // Filter only approved products
  const approvedProducts = apiResponse?.data?.filter(product => product.status === "approved") || []

  // Delete product mutation
  const deleteProduct = useMutation({
    mutationFn: async (productId: string) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/assigned-product/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete product")
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast.success("Product deleted successfully")
      setIsDeleteModalOpen(false)
      setProductToDelete(null)
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete product: ${error.message}`)
      setIsDeleteModalOpen(false)
      setProductToDelete(null)
    },
  })

  // Update coin mutation
  const updateCoin = useMutation({
    mutationFn: async ({ productId, coin }: { productId: string; coin: number }) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/assigned-product/add-coin/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ coin }),
      })

      if (!response.ok) {
        throw new Error("Failed to update coin")
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast.success("Coin value updated successfully")
    },
    onError: (error: Error) => {
      toast.error(`Failed to update coin value: ${error.message}`)
    },
  })

  // Session loading state
  if (session.status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading session...</p>
        </div>
      </div>
    )
  }

  // Token validation
  if (!token) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Authentication required</p>
        <p className="text-gray-400 text-sm mt-1">Please log in to view products.</p>
      </div>
    )
  }

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const handleDeleteClick = (productId: string, productName: string) => {
    setProductToDelete({ id: productId, name: productName })
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteProduct.mutate(productToDelete.id)
    }
  }

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false)
    setProductToDelete(null)
  }

  const handleRefresh = () => {
    refetch()
    toast.success("Product list has been updated")
  }

  const handleUpdateCoin = async (productId: string, coin: number) => {
    updateCoin.mutate({ productId, coin })
  }

  const columns = [
    {
      key: "productName",
      header: "Product Name",
      render: (item: Product) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
           <Image src={item.product?.productImage || ""} width={100} height={100} alt="Product Image" />
          </div>
          <div>
            <span className="font-medium">{item.product?.title || "Product"}</span>
            <div className="text-sm text-gray-500">{item.shopId?.companyName}</div>
          </div>
        </div>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (item: Product) => <span className="font-medium">${item.product?.price || 0}</span>,
    },
    {
      key: "quantity",
      header: "Quantity",
      render: (item: Product) => (
        <span className={`${item.product?.quantity < 10 ? "text-red-600" : "text-gray-900"}`}>
          {item.product?.quantity || 0}
        </span>
      ),
    },
    {
      key: "coin",
      header: "Coins",
      render: (item: Product) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
          {item.coin}
        </span>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (item: Product) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {item.product?.category?.title || "N/A"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: Product) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {item.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: Product) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEditClick(item)}
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            title="Edit coins"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeleteClick(item._id, item.product?.title || "Product")}
            disabled={deleteProduct.isPending}
            className="text-red-600 hover:text-red-800 hover:bg-red-50"
            title="Delete product"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Error loading products</p>
        <p className="text-gray-400 text-sm mt-1">{error.message}</p>
        <Button onClick={handleRefresh} className="mt-4">
          <RefreshCw className="h-4 w-4 mr-2" /> Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <Toaster richColors />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Approved Products</h1>
          <Breadcrumb items={[{ label: "Dashboard" }, { label: "Products" }, { label: "Approved" }]} />
        </div>
        <Button onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" /> Refresh
        </Button>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        {approvedProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m0 0V9a2 2 0 012-2h2m0 0V6a2 2 0 012-2h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V9a2 2 0 012 2v2m0 0h2"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No approved products found</p>
            <p className="text-gray-400 text-sm mt-1">
              You may have pending or rejected products. Contact support or wait for approval.
            </p>
            <Button onClick={handleRefresh} className="mt-4">
              <RefreshCw className="h-4 w-4 mr-2" /> Refresh List
            </Button>
          </div>
        ) : (
          <DataTable data={approvedProducts} columns={columns} />
        )}
      </div>

      <EditCoinModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpdateCoin={handleUpdateCoin}
        isUpdating={updateCoin.isPending}
      />

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot{productToDelete?.name}&quot? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCancelDelete}
              disabled={deleteProduct.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={deleteProduct.isPending}
              className="bg-red-600 hover:bg-red-800 text-white"
            >
              {deleteProduct.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}