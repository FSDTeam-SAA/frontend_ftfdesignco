"use client";

import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "../_components/breadcrumb";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { employOrderDelete, fetchOrders, orderStatus } from "@/lib/api";
import { Order } from "@/lib/companytypes";
import { toast } from "sonner";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useMemo } from "react";
import { Trash } from "lucide-react";

export default function OrderHistoryPage() {
  const { data: ordersResponse, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetchOrders(),
  });

  const queryClient = useQueryClient();

  // Pagination state
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const orders: Order[] = ordersResponse?.data || [];
  const total = orders.length;
  const totalPages = Math.ceil(total / itemsPerPage);

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, total);

  const currentData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return orders.slice(start, start + itemsPerPage);
  }, [orders, page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Approve mutation
  const orderMutation = useMutation({
    mutationKey: ["orders"],
    mutationFn: ({ Id, status }: { Id: string; status: string }) =>
      orderStatus(Id, status),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  // Cancel mutation
  const orderCancelMutation = useMutation({
    mutationKey: ["orders"],
    mutationFn: ({ Id, status }: { Id: string; status: string }) =>
      orderStatus(Id, status),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  // Delete mutation
  const orderDeleteMutation = useMutation({
    mutationKey: ["orders"],
    mutationFn: (id: string) => employOrderDelete(id),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  const handelstatus = (Id: string, status: string) => {
    orderMutation.mutate({ Id, status });
  };

  const handelCancelstatus = (Id: string, status: string) => {
    orderCancelMutation.mutate({ Id, status });
  };

  const handelDelete = (id: string) => {
    orderDeleteMutation.mutate(id);
  };

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
          <Breadcrumb
            items={[{ label: "Dashboard" }, { label: "Order History" }]}
          />
        </div>

        <div className="bg-white rounded-lg border">
          <div className="grid grid-cols-6 gap-4 px-6 py-3 border-b bg-gray-50">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>

          <div className="divide-y">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-6 gap-4 items-center px-6 py-4"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <div className="flex gap-2 justify-end">
                  <Skeleton className="h-8 w-16 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 pt-4">
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </div>
    );
  }

  // Table columns
  const columns = [
    {
      key: "productName",
      header: "Product Name",
      render: (order: Order) => (
        <div className="flex justify-center items-center gap-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden border">
            <Image
              src={order?.items?.[0]?.image || "/placeholder.png"}
              alt="order Image"
              width={50}
              height={50}
              className="object-cover"
            />
          </div>
          <span className="font-medium">
            {order.items?.[0]?.title || "T-Shirt"}
          </span>
        </div>
      ),
    },
    {
      key: "coins",
      header: "Coins",
      render: (order: Order) => order.totalPayCoin || 0,
    },
    {
      key: "quantity",
      header: "Quantity",
      render: (order: Order) =>
        order.items?.reduce((sum, i) => sum + (i.quantity || 0), 0) || 0,
    },
    {
      key: "employeeId",
      header: "Employee Id",
      render: (order: Order) => order.employee?.employeeId || "N/A",
    },
    {
      key: "date",
      header: "Date",
      render: (order: Order) => {
        const date = new Date(order.createdAt);
        return (
          <div>
            <div>{date.toLocaleDateString()}</div>
            <div className="text-sm text-gray-500">
              {date.toLocaleTimeString()}
            </div>
          </div>
        );
      },
    },
    {
      key: "action",
      header: "Action",
      render: (order: Order) => (
        console.log(order.status),
        <div className="flex items-center justify-center gap-2">
          {/* Approve Button */}
          <Badge
            onClick={() =>
              order.status !== "approved" &&
              order.status !== "rejected" &&
              handelstatus(order._id, "approved")
            }
            className={`bg-green-100 text-green-600 
      ${
        order.status === "approved" || order.status === "rejected"
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer"
      } ${order.status === "rejected" && "hidden"}`}
          >
            Approved
          </Badge>

          {/* Cancel Button */}
          <Badge
            onClick={() =>
              order.status !== "approved" &&
              order.status !== "rejected" &&
              handelCancelstatus(order._id, "rejected")
            }
            className={`bg-red-100 text-red-800 
      ${
        order.status === "approved" || order.status === "rejected"
          ? "opacity-50 cursor-not-allowed hidden"
          : "cursor-pointer block"
      }`}
          >
            Cancel
          </Badge>
          <Badge
           
            className={`bg-red-100 text-red-800 
      ${
        order.status === "rejected" 
          ? "opacity-50 cursor-not-allowed block"
          : "cursor-pointer hidden"
      }`}
          >
            Rejected
          </Badge>
          {/* Trash Button (only visible when cancelled) */}
          {order.status === "rejected" && (
            <Badge
              onClick={() => handelDelete(order._id)}
              className="bg-gray-100 text-gray-800 cursor-pointer"
            >
              <Trash className="w-4 h-4" />
            </Badge>
          )}
        </div>
      ),
    },
  ];
 console.log('hello',currentData)
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
        <Breadcrumb
          items={[{ label: "Dashboard" }, { label: "Order History" }]}
        />
      </div>

      <div className="bg-white rounded-lg border">
        <DataTable data={currentData} columns={columns} />

        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t">
          <div className="text-sm text-gray-700">
            Showing {startItem} to {endItem} of {total} results
          </div>
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(page - 1)}
                    className={
                      page === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        onClick={() => handlePageChange(p)}
                        isActive={page === p}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                {totalPages > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(page + 1)}
                    className={
                      page === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}
