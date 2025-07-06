
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  productImage: string;
  category: {
    _id: string;
    title: string;
  };
}

interface ProductsResponse {
  success: boolean;
  data: Product[];
  totalProducts: number;
  currentPage: number;
  totalPages: number;
}

interface GetProductsParams {
  category?: string;
  page?: string;
  limit?: string;
  sort?: string;
}

async function getProducts(
  searchParams: GetProductsParams
): Promise<ProductsResponse> {
  const {
    category,
    page = "1",
    limit = "12",
    sort = "createdAt",
  } = searchParams;

  let url = `${process.env.NEXT_PUBLIC_API_URL}/product/get-all?page=${page}&limit=${limit}&sort=${sort}`;
  if (category) {
    url += `&category=${category}`;
  }

  try {
    const response = await fetch(url, { cache: "no-store" });
    const data: ProductsResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return {
      success: false,
      data: [],
      totalProducts: 0,
      currentPage: 1,
      totalPages: 1,
    };
  }
}

export async function ProductsGrid({
  searchParams,
}: {
  searchParams: GetProductsParams;
}) {
  const productsData = await getProducts(searchParams);
  const {
    data: products,
    totalProducts,
    currentPage,
    totalPages,
  } = productsData;

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
          <div key={product._id}>
            <Link href={`/all-product/${product._id}`} className="p-0">
              <div className="flex items-center justify-center">
                <div>
                  <div className="relative aspect-square">
                    <Image
                      src={product.productImage || "/placeholder.svg"}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="object-cover rounded-t-lg w-[300px] h-[300px]"
                    />
                  </div>
                  <div className="py-4 text-center">
                    <h3 className="font-semibold mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <span className="text-gray-600">${product.price}</span>
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
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href={`/products?page=${pageNum}`}
                      isActive={pageNum === currentPage}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (
                pageNum === currentPage - 2 ||
                pageNum === currentPage + 2
              ) {
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}

            <PaginationItem>
              <PaginationNext
                href={`/products?page=${Math.min(totalPages, currentPage + 1)}`}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
