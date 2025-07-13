"use client"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner" // Assuming Shadcn/UI toast
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

interface Product {
  _id: string
  productId: {
    _id: string
    title: string
    price: number
    quantity: number
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
  status: string
  __v: number
}

interface ProductsResponse {
  success: boolean
  code: number
  message: string
  data: Product[]
  totalProducts?: number
  currentPage?: number
  totalPages?: number
}

interface GetProductsParams {
  category?: string
  page?: string
  limit?: string
  sort?: string
}

async function fetchProducts({
  searchParams,
  token,
}: {
  searchParams: GetProductsParams
  token: string
}): Promise<ProductsResponse> {
  const { category, page = "1", limit = "12", sort = "createdAt" } = searchParams
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/assigned-product/my-shop?page=${page}&limit=${limit}&sort=${sort}`
  if (category) {
    url += `&category=${category}`
  }
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data: ProductsResponse = await response.json()
  return data
}

async function addToCart({
  productId,
  quantity,
  token,
}: {
  productId: string
  quantity: number
  token: string
}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cart/add-to-cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  })
  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.message || "Failed to add product to cart")
  }
  return result
}

export default function CompanyProducts({
  searchParams,
}: {
  searchParams: GetProductsParams
}) {
  const { data: session } = useSession()
  const token = session?.accessToken
  const queryClient = useQueryClient()

  const {
    data: productsData,
    isLoading,
    error,
  } = useQuery<ProductsResponse>({
    queryKey: ["products", searchParams, token],
    queryFn: () => fetchProducts({ searchParams, token: token! }),
    enabled: !!token, // Only fetch if token exists
  })

  const addToCartMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      addToCart({ productId, quantity, token: token! }),
    onSuccess: (data) => {
      toast.success(data.message)
      // Optionally invalidate cart-related queries
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  if (!token) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Please sign in to view products.</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Failed to load products: {error.message}</p>
      </div>
    )
  }

  // Filter products where coin > 0 and status is "approved"
  const filteredProducts =
    productsData?.data.filter((product) => product.coin > 0 && product.status === "approved") || []

  // Use pagination data from API if available, otherwise use defaults
  const currentPage = productsData?.currentPage || Number.parseInt(searchParams.page || "1")
  const totalPages = productsData?.totalPages || 1
  const totalProducts = productsData?.totalProducts || filteredProducts.length

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">All Products</h1>
        <div className="text-sm text-gray-600">
          Showing {filteredProducts.length} of {totalProducts} products
        </div>
      </div>
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No approved products with coins available.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {filteredProducts.map((product) => (
              <div key={product._id} className="group relative">
                <Link href={`/shop/${product.productId._id}`} className="block">
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                    <div className="relative aspect-square">
                      <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt={product.productId.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      {/* Add to Cart Button on Hover */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md"
                          onClick={(e) => {
                            e.preventDefault() // Prevent navigating to product detail page
                            addToCartMutation.mutate({ productId: product.productId._id, quantity: 1 })
                          }}
                          disabled={addToCartMutation.isPending}
                        >
                          {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2 text-sm sm:text-base">
                        {product.productId.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">${product.productId.price}</span>
                        <div className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                          {product.coin} Coins
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={`/products?page=${Math.max(1, currentPage - 1)}`}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink href={`/products?page=${pageNum}`} isActive={pageNum === currentPage}>
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )
                  }
                  return null
                })}
                <PaginationItem>
                  <PaginationNext
                    href={`/products?page=${Math.min(totalPages, currentPage + 1)}`}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  )
}
