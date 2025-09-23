// "use client";

// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   UseQueryResult,
// } from "@tanstack/react-query";
// import { Button } from "@/components/ui/button";
// import { RefreshCw } from "lucide-react";
// import { DataTable } from "@/components/ui/data-table";
// import { toast, Toaster } from "sonner";
// import { Breadcrumb } from "../../_components/breadcrumb";
// import { useSession } from "next-auth/react";
// import Image from "next/image";

// interface Product {
//   _id: string;
//   product: {
//     _id: string;
//     title: string;
//     price: number;
//     quantity: number;
//     productImage: string;
//     category: {
//       _id: string;
//       title: string;
//     };
//   };
//   userId: string;
//   shopId: {
//     _id: string;
//     companyId: string;
//     companyName: string;
//   };
//   coin: number;
//   status: "pending" | "approved" | "rejected";
//   __v: number;
// }

// interface ApiResponse {
//   success: boolean;
//   code: number;
//   message: string;
//   data: Product[] | null;
// }

// export default function RequestedProductsList() {
//   const queryClient = useQueryClient();
//   const session = useSession();
//   const token = session?.data?.accessToken;

//   // Fetch products query
//   const {
//     data: apiResponse,
//     isLoading,
//     error,
//     refetch,
//   }: UseQueryResult<ApiResponse, Error> = useQuery({
//     queryKey: ["requested-products"],
//     queryFn: async (): Promise<ApiResponse> => {
//       if (!token)
//         return {
//           success: false,
//           code: 401,
//           message: "Unauthorized",
//           data: null,
//         };

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/assigned-product/my-shop`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
    
//       if (!response.ok) {
//         // const errorText = await response.text()
//         throw new Error(`Failed to fetch products: ${response.statusText}`);
//       }

//       return response.json();
//     },
//     staleTime: 5 * 60 * 1000,
//     gcTime: 10 * 60 * 1000,
//     retry: 2,
//     enabled: !!token,
//   });

//   // Filter only pending products
//   const pendingProducts =
//     // apiResponse?.data?.filter((product) => product.status === "pending") || [];
//     apiResponse?.data || [];

//   // Status update mutation
//   const updateStatus = useMutation({
//     mutationFn: async ({
//       productId,
//       // status,
//     }: {
//       productId: string;
//       status: string;
//     }) => {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/assigned-product/shop-product/${productId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           // body: JSON.stringify({ status }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update status");
//       }

//       return response.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["requested-products"] });
//       toast.success("Product status updated successfully");
//     },
//     onError: (error: Error) => {
//       toast.error(`Failed to update status: ${error.message}`);
//     },
//   });

//   // Session loading state
//   if (session.status === "loading") {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
//           <p className="mt-2 text-gray-600">Loading session...</p>
//         </div>
//       </div>
//     );
//   }

//   // Token validation
//   if (!token) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-red-500 text-lg">Authentication required</p>
//         <p className="text-gray-400 text-sm mt-1">
//           Please log in to view products.
//         </p>
//       </div>
//     );
//   }

//   const handleRefresh = () => {
//     refetch();
//     toast.success("Product list has been updated");
//   };

//   const handleReject = (productId: string) => {
//     updateStatus.mutate({ productId, status: "rejected" });
//   };

//   const columns = [
//     {
//       key: "productName",
//       header: "Product Name",
//       render: (item: Product) => (
//         console.log(item),
//         (
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12  rounded-lg flex items-center justify-center">
//               <Image
//                 src={item.product?.productImage}
//                 alt="No Image"
//                 width={50}
//                 height={50}
//               />
//             </div>
//             <div>
//               <span className="font-medium">
//                 {item.product?.title || "Product"}
//               </span>
//               <div className="text-sm text-gray-500">
//                 {item.shopId?.companyName}
//               </div>
//             </div>
//           </div>
//         )
//       ),
//     },
//     {
//       key: "price",
//       header: "Price",
//       render: (item: Product) => (
//         <span className="font-medium">${item.product?.price || 0}</span>
//       ),
//     },
//     {
//       key: "quantity",
//       header: "Quantity",
//       render: (item: Product) => (
//         <span
//           className={`${
//             item.product?.quantity < 10 ? "text-red-600" : "text-gray-900"
//           }`}
//         >
//           {item.product?.quantity || 0}
//         </span>
//       ),
//     },
//     {
//       key: "category",
//       header: "Category",
//       render: (item: Product) => (
//         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//           {item.product?.category?.title || "N/A"}
//         </span>
//       ),
//     },
//     {
//       key: "status",
//       header: "Status",
//       render: (item: Product) => (
//         <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#035F8A] text-white">
//           {item.status}
//         </span>
//       ),
//     },
//     {
//       key: "actions",
//       header: "Actions",
//       render: (item: Product) => (
//         <div className="flex items-center gap-2">
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => handleReject(item._id)}
//             className="text-red-600 hover:text-red-800 bg-red-50"
//             title="Reject product"
//             disabled={updateStatus.isPending}
//           >
//             Cancel
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
//           <p className="mt-2 text-gray-600">Loading products...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-red-500 text-lg">Error loading products</p>
//         <p className="text-gray-400 text-sm mt-1">{error.message}</p>
//         <Button onClick={handleRefresh} className="mt-4">
//           <RefreshCw className="h-4 w-4 mr-2" /> Try Again
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 p-6">
//       <Toaster richColors />
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">
//             Requested Products
//           </h1>
//           <Breadcrumb
//             items={[
//               { label: "Dashboard" },
//               { label: "Products" },
//               { label: "Requests" },
//             ]}
//           />
//         </div>
//       </div>

//       <div className="bg-white rounded-lg border shadow-sm">
//         {pendingProducts.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="text-gray-400 mb-4">
//               <svg
//                 className="mx-auto h-12 w-12"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m0 0V9a2 2 0 012-2h2m0 0V6a2 2 0 012-2h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V9a2 2 0 012 2v2m0 0h2"
//                 />
//               </svg>
//             </div>
//             <p className="text-gray-500 text-lg">No pending product requests</p>
//             <p className="text-gray-400 text-sm mt-1">
//               There are currently no products awaiting approval.
//             </p>
//             <Button onClick={handleRefresh} className="mt-4">
//               <RefreshCw className="h-4 w-4 mr-2" /> Refresh List
//             </Button>
//           </div>
//         ) : (
//           <DataTable data={pendingProducts} columns={columns} />
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { toast, Toaster } from "sonner";
import { Breadcrumb } from "../../_components/breadcrumb";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import React from "react";

interface Product {
  _id: string;
  product: {
    _id: string;
    title: string;
    price: number;
    quantity: number;
    productImage: string;
    category: {
      _id: string;
      title: string;
    };
  };
  userId: string;
  shopId: {
    _id: string;
    companyId: string;
    companyName: string;
  };
  coin: number;
  status: "pending" | "approved" | "rejected";
  __v: number;
}

interface ApiResponse {
  success: boolean;
  code: number;
  message: string;
  data: Product[] | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function RequestedProductsList() {
  const queryClient = useQueryClient();
  const session = useSession();
  const token = session?.data?.accessToken;

  // State for current page
  const [currentPage, setCurrentPage] = React.useState(1);

  // Fetch products query
  const {
    data: apiResponse,
    isLoading,
    error,
    refetch,
  }: UseQueryResult<ApiResponse, Error> = useQuery({
    queryKey: ["requested-products", currentPage],
    queryFn: async (): Promise<ApiResponse> => {
      if (!token)
        return {
          success: false,
          code: 401,
          message: "Unauthorized",
          data: null,
          pagination: { total: 0, page: 1, limit: 10, totalPages: 1 },
        };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/assigned-product/my-shop?page=${currentPage}&limit=10`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }

      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    enabled: !!token,
  });

  // Filter only pending products
  const pendingProducts = apiResponse?.data || [];

  // Pagination data
  const pagination = apiResponse?.pagination || {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  };
  const startItem = (pagination.page - 1) * pagination.limit + 1;
  const endItem = Math.min(startItem + pagination.limit - 1, pagination.total);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page);
    }
  };

  // Status update mutation
  const updateStatus = useMutation({
    mutationFn: async ({
      productId,
      status,
    }: {
      productId: string;
      status: string;
    }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/assigned-product/shop-product/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requested-products"] });
      toast.success("Product status updated successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update status: ${error.message}`);
    },
  });

  // Session loading state
  if (session.status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading session...</p>
        </div>
      </div>
    );
  }

  // Token validation
  if (!token) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Authentication required</p>
        <p className="text-gray-400 text-sm mt-1">
          Please log in to view products.
        </p>
      </div>
    );
  }

  const handleRefresh = () => {
    refetch();
    toast.success("Product list has been updated");
  };

  const handleReject = (productId: string) => {
    updateStatus.mutate({ productId, status: "rejected" });
  };

  const columns = [
    {
      key: "productName",
      header: "Product Name",
      render: (item: Product) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center">
            <Image
              src={item.product?.productImage}
              alt="No Image"
              width={50}
              height={50}
            />
          </div>
          <div>
            <span className="font-medium">
              {item.product?.title || "Product"}
            </span>
            <div className="text-sm text-gray-500">
              {item.shopId?.companyName}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (item: Product) => (
        <span className="font-medium">${item.product?.price || 0}</span>
      ),
    },
    {
      key: "quantity",
      header: "Quantity",
      render: (item: Product) => (
        <span
          className={`${
            item.product?.quantity < 10 ? "text-red-600" : "text-gray-900"
          }`}
        >
          {item.product?.quantity || 0}
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
        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#035F8A] text-white">
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
            onClick={() => handleReject(item._id)}
            className="text-red-600 hover:text-red-800 bg-red-50"
            title="Reject product"
            disabled={updateStatus.isPending}
          >
            Cancel
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
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
    );
  }

  return (
    <div className="space-y-6 p-6">
      <Toaster richColors />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Requested Products
          </h1>
          <Breadcrumb
            items={[
              { label: "Dashboard" },
              { label: "Products" },
              { label: "Requests" },
            ]}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        {pendingProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m0 0V9a2 2 0 012-2h2m0 0V6a2 2 0 012-2h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V9a2 2 0 012 2v2m0 0h2"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No pending product requests</p>
            <p className="text-gray-400 text-sm mt-1">
              There are currently no products awaiting approval.
            </p>
            <Button onClick={handleRefresh} className="mt-4">
              <RefreshCw className="h-4 w-4 mr-2" /> Refresh List
            </Button>
          </div>
        ) : (
          <>
            <DataTable data={pendingProducts} columns={columns} />
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t">
              <div className="text-sm text-gray-700">
                Showing {startItem} to {endItem} of {pagination.total} results
              </div>
              <div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(pagination.page - 1)}
                        className={
                          pagination.page === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                    {Array.from(
                      { length: pagination.totalPages },
                      (_, i) => i + 1
                    ).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={pagination.page === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    {pagination.totalPages > 3 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(pagination.page + 1)}
                        className={
                          pagination.page === pagination.totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}