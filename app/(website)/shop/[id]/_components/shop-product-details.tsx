/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import ShopNavbar from "@/components/shared/shopnavbar";

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
  coin?: number;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface AddToCartRequest {
  productId: string;
}

interface ProductDetailProps {
  id: string;
}

interface ExtendedSession {
  accessToken?: string;
}

// Custom hooks
const useProductDetail = (id: string, token: string | undefined) => {
  return useQuery<Product>({
    queryKey: ["products", id],
    queryFn: async (): Promise<Product> => {
      if (!token) throw new Error("Authentication required");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.statusText}`);
      }

      const result: ApiResponse<Product> = await response.json();
      return result.data;
    },
    enabled: Boolean(token && id),
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

const useAddToCart = (token: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<any>, Error, AddToCartRequest>({
    mutationFn: async ({ productId }: AddToCartRequest) => {
      if (!token) throw new Error("Authentication required");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/add-to-cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId }),
        }
      );

      const result: ApiResponse<any> = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add product to cart");
      }

      return result;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Product added to cart successfully");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add product to cart");
    },
  });
};

// Main component
export function ShopProductDetail({ id }: ProductDetailProps) {
  const { data: session } = useSession();
  const token = (session as ExtendedSession)?.accessToken;

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProductDetail(id, token);
  const addToCartMutation = useAddToCart(token);

  const handleAddToCart = (): void => {
    if (!product) {
      toast.error("Product not available");
      return;
    }
    if (!token) {
      toast.error("Please log in to add the product");
      return;
    }

    addToCartMutation.mutate({
      productId: product._id,
    });
  };

  // Loading states and error handling
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ShopNavbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Authentication Required
              </h2>
              <p className="text-gray-600">
                Please sign in to view product details.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ShopNavbar />
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gray-300 rounded-lg aspect-square"></div>
              <div className="space-y-6">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ShopNavbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {!product ? "Product Not Found" : "Error Loading Product"}
              </h2>
              <p className="text-gray-600">
                {error instanceof Error
                  ? error.message
                  : "Failed to load product. Please try again later."}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopNavbar />

      <main className="container mx-auto px-4 py-8">
        {/* Product Details Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={product.productImage || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  {product.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="text-2xl lg:text-3xl font-bold text-blue-600">
                    ${product.price.toFixed(2)}
                  </span>

                  {product.coin && product.coin > 0 && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {product.coin} Coins
                    </span>
                  )}
                </div>

                <div className="text-sm text-gray-600">
                  Category:{" "}
                  <span className="font-medium">{product.category.title}</span>
                </div>
              </div>

              {/* Quantity and Total */}
              {/* <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Quantity
                    </Label>
                    <div className="flex items-center space-x-3 p-2 bg-white border border-gray-300 rounded-md w-fit">
                      <button
                        onClick={() => updateQuantity(quantity - 1)}
                        disabled={quantity <= 1}
                        className="flex items-center justify-center w-8 h-8 text-pink-600 hover:bg-pink-50 rounded-full disabled:text-gray-400 disabled:hover:bg-transparent transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <span className="w-12 text-center font-medium text-gray-900">
                        {quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(quantity + 1)}
                        disabled={quantity >= product.quantity}
                        className="flex items-center justify-center w-8 h-8 text-pink-600 hover:bg-pink-50 rounded-full disabled:text-gray-400 disabled:hover:bg-transparent transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-1 text-xs text-gray-500">
                      {product.quantity} available
                    </div>
                  </div>

                  <div className="text-right ml-8">
                    <div className="text-sm text-gray-600 mb-1">Total</div>
                    <div className="text-2xl font-bold text-gray-900">
                      ${total.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Add to Cart Button */}
              <div className="pt-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={
                    addToCartMutation.isPending || product.quantity === 0
                  }
                  className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-white font-medium px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addToCartMutation.isPending
                    ? "Adding to Cart..."
                    : product.quantity === 0
                    ? "Out of Stock"
                    : "Add to Cart"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 text-center">
            Product Description
          </h2>

          <div className="prose max-w-none">
            <div className="text-gray-700 leading-relaxed">
              {product.description ||
                "No description available for this product."}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
