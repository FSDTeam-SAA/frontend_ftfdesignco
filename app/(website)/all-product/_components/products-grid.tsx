import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SortBy } from "./SortBy";

export interface GetProductsParams {
  category?: string;
  page?: string;
  limit?: string;
  sort?: string;
  prices?: string;
  search?: string;
  brand?: string;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  productImage: string;
  category: { _id: string; title: string };
}

interface ProductsResponse {
  success: boolean;
  data: Product[];
  totalProducts: number;
  currentPage: number;
  totalPages: number;
}

async function getProducts(
  searchParams: GetProductsParams
): Promise<ProductsResponse> {
  const {
    category,
    page = "1",
    limit = "8",
    sort = "createdAt",
    prices,
    search,
    brand,
  } = searchParams;

  let url = `${process.env.NEXT_PUBLIC_API_URL}/product/get-all?page=${page}&limit=${limit}&sort=${sort}`;
  if (category) url += `&category=${category}`;
  if (prices) url += `&prices=${prices}`;
  if (search) url += `&search=${search}`;
  if (brand) url += `&brand=${brand}`;

  try {
    const response = await fetch(url, { cache: "no-store" });
    const data: ProductsResponse = await response.json();
    return data;
  } catch {
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

  console.log("all data", productsData);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
  <h1 className="text-2xl font-bold">All Products</h1>
  <div className="flex items-center gap-6">
    <div className="text-sm text-gray-600">
      Showing {products.length} of {totalProducts} products
    </div>
    <SortBy /> {/* ⬅️ add here */}
  </div>
</div>


      {/* No Products */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found.</p>
        </div>
      ) : (
        <>
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {products.map((product) => (
              <div key={product._id} className="group">
                <Link href={`/all-product/${product._id}`} className="block">
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden border">
                    <div className="relative aspect-square bg-[#E9E9E9]">
                      <Image
                        src={
                          product.productImage ||
                          "/placeholder.svg?height=300&width=300"
                        }
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-semibold mb-2 line-clamp-2 text-sm sm:text-base">
                        {product.title}
                      </h3>
                      <div className="flex flex-col gap-3 items-center justify-between">
                        <span className="text-lg md:text-[40px] font-semibold py-1 text-gray-900">
                          ${product.price}
                        </span>
                        <span className="text-xs md:text-[18px] text-[#000000] px-2">
                          {product.category.title}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Custom Pagination */}
          {/* Custom Pagination */}
          <div className="flex items-center justify-center space-x-2">
            {/* Previous */}
            {currentPage > 1 ? (
              <Link
                href={`/all-product?page=${currentPage - 1}`}
                className="flex items-center justify-center w-10 h-10 border rounded-full hover:bg-gray-100"
              >
                <ChevronLeft size={20} />
              </Link>
            ) : (
              <div className="flex items-center justify-center w-10 h-10 border rounded-full text-gray-400 cursor-not-allowed">
                <ChevronLeft size={20} />
              </div>
            )}

            {/* Page numbers */}
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;

              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <Link
                    key={pageNum}
                    href={`/all-product?page=${pageNum}`}
                    className={`flex items-center justify-center w-10 h-10 border rounded-full ${
                      pageNum === currentPage
                        ? "bg-[#23547B] text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              } else if (
                pageNum === currentPage - 2 ||
                pageNum === currentPage + 2
              ) {
                return (
                  <span key={pageNum} className="px-2">
                    ...
                  </span>
                );
              }
              return null;
            })}

            {/* Next */}
            {currentPage < totalPages ? (
              <Link
                href={`/all-product?page=${currentPage + 1}`}
                className="flex items-center justify-center w-10 h-10 border rounded-full hover:bg-gray-100"
              >
                <ChevronRight size={20} />
              </Link>
            ) : (
              <div className="flex items-center justify-center w-10 h-10 border rounded-full text-gray-400 cursor-not-allowed">
                <ChevronRight size={20} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
