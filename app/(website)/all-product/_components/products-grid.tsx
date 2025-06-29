import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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

async function getProducts(searchParams: any): Promise<ProductsResponse> {
  const { category, page = "1", limit = "12", sort = "createdAt" } = searchParams

  let url = `http://localhost:5001/api/v1/product/get-all?page=${page}&limit=${limit}&sort=${sort}`
  if (category) {
    url += `&category=${category}`
  }

  try {
    const response = await fetch(url, { cache: "no-store" })
    const data = await response.json()
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

export async function ProductsGrid({ searchParams }: { searchParams: any }) {
  const productsData = await getProducts(searchParams)
  const { data: products, totalProducts, currentPage, totalPages } = productsData

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Products</h1>
        <div className="text-sm text-gray-600">
          Showing {products.length} of {totalProducts} products
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {products.map((product) => (
          <Card key={product._id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <Image
                  src={product.productImage || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <span className="text-xs text-gray-500 uppercase">{product.category.title}</span>
                <h3 className="font-semibold mb-2 line-clamp-2">{product.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">${product.price}</span>
                  <Button asChild size="sm">
                    <Link href={`/${product._id}`}>View</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
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
    </div>
  )
}
