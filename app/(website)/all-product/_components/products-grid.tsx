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

interface Product {
  _id: string
  title: string
  description: string
  price: number
  productImage: string
  category: {
    _id: string
    title: string
  }
}

interface ProductsResponse {
  success: boolean
  data: Product[]
  totalProducts: number
  currentPage: number
  totalPages: number
}

interface GetProductsParams {
  category?: string
  page?: string
  limit?: string
  sort?: string
}

async function getProducts(searchParams: GetProductsParams): Promise<ProductsResponse> {
  const { category, page = "1", limit = "12", sort = "createdAt" } = searchParams

  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/get-all?page=${page}&limit=${limit}&sort=${sort}`

  if (category) {
    url += `&category=${category}`
  }

  try {
    const response = await fetch(url, { cache: "no-store" })
    const data: ProductsResponse = await response.json()
    return data
  } catch (error) {
    console.error("Failed to fetch products:", error)
    return {
      success: false,
      data: [],
      totalProducts: 0,
      currentPage: 1,
      totalPages: 1,
    }
  }
}

export async function ProductsGrid({ searchParams }: { searchParams: GetProductsParams }) {
  const productsData = await getProducts(searchParams)
  const { data: products, totalProducts, currentPage, totalPages } = productsData

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">All Products</h1>
        <div className="text-sm text-gray-600">
          Showing {products.length} of {totalProducts} products
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {products.map((product) => (
              <div key={product._id} className="group">
                <Link href={`/all-product/${product._id}`} className="block">
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border">
                    <div className="relative aspect-square">
                      <Image
                        src={product.productImage || "/placeholder.svg?height=300&width=300"}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2 text-sm sm:text-base">{product.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">${product.price}</span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {product.category.title}
                        </span>
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
