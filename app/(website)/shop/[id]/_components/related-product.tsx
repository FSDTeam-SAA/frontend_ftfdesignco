"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Package } from "lucide-react";
import Image from "next/image";

// Type definitions
interface Category {
  _id: string;
  title: string;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  productImage: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Pagination {
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  limit: number;
}

interface ApiResponse {
  success: boolean;
  code: number;
  message: string;
  data: Product[];
  pagination: Pagination;
}

interface ProductsByCategoryProps {
  category: string;
}

// API fetch function
const fetchProductsByCategory = async (
  category: string
): Promise<ApiResponse> => {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/product/get-all?category=${encodeURIComponent(category)}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch products: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

// Skeleton component for loading state
const ProductSkeleton = () => (
  <Card className="h-full bg-gray-200">
    <CardHeader className="space-y-2">
      <Skeleton className="h-48 w-full rounded-md" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </CardHeader>
    <CardContent className="space-y-2">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </CardContent>
    <CardFooter className="justify-between">
      <Skeleton className="h-6 w-16" />
      <Skeleton className="h-5 w-20" />
    </CardFooter>
  </Card>
);

// Main component
export default function ProductsByCategory({
  category,
}: ProductsByCategoryProps) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["products", category],
    queryFn: () => fetchProductsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Format price
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // Format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 ">
        <div className="mb-6">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error instanceof Error ? error.message : "Failed to load products"}
            <button
              onClick={() => refetch()}
              className="ml-2 underline hover:no-underline"
            >
              Try again
            </button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // No data state
  if (!data?.data || data.data.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No products found</h3>
          <p className="text-muted-foreground">
            No products available in the &#34;{category}&#34; category.
          </p>
        </div>
      </div>
    );
  }

  const { data: products, pagination } = data;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 capitalize">Related Products</h1>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {products.map((product) => (
          <Card
            key={product._id}
            className="h-full flex flex-col hover:shadow-lg transition-shadow"
          >
            <CardHeader className="p-0">
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <Image
                  src={product.productImage}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {product.quantity <= 5 && product.quantity > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute top-2 right-2"
                  >
                    Low Stock
                  </Badge>
                )}
                {product.quantity === 0 && (
                  <Badge variant="secondary" className="absolute top-2 right-2">
                    Out of Stock
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="flex-1 p-4">
              <CardTitle className="text-lg mb-2 line-clamp-2">
                {product.title}
              </CardTitle>
              <CardDescription className="text-sm line-clamp-3 mb-4">
                {product.description}
              </CardDescription>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Qty: {product.quantity}</span>
                <span>Added: {formatDate(product.createdAt)}</span>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex items-center justify-between">
              <div className="text-2xl font-bold text-primary">
                {formatPrice(product.price)}
              </div>
              <Badge variant="outline" className="capitalize">
                {product.category.title}
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination Info */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <span>•</span>
          <span>{pagination.totalProducts} total products</span>
        </div>
      )}
    </div>
  );
}
