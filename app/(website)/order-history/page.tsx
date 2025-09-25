"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { PaginationComponent } from "@/components/shared/pagination-component";
import { useQuery } from "@tanstack/react-query";
import { employeorderhistory } from "@/lib/api";
import { Order, OrdersResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";

export default function OrdersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null); // ✅ track clicked order
  const limit = 10;

  const { data, isLoading } = useQuery<OrdersResponse>({
    queryKey: ["employorderhistory"],
    queryFn: () => employeorderhistory(),
  });

  const orders: Order[] = data?.data ?? [];
  const totalPages = Math.ceil(orders.length / limit);

  const paginatedOrders = orders.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
 
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <h1 className="text-3xl font-bold mb-8">Orders</h1>
      <Card className="container rounded-xl overflow-hidden border border-[#3F3F3F] pt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto border border-[#3F3F3F] border-collapse">
            <thead className="border-b border-[#3F3F3F]">
              <tr className="text-[18px] text-[#131313] font-medium">
                <th className="px-4 py-3 border border-[#3F3F3F]">
                  Product Name
                </th>
                <th className="px-4 py-3 border border-[#3F3F3F]">Coins</th>
                {/* <th className="px-4 py-3 border border-[#3F3F3F]">Employee</th> */}
                {/* <th className="px-4 py-3 border border-[#3F3F3F]">Shop</th> */}
                <th className="px-4 py-3 border border-[#3F3F3F]">Status</th>
                <th className="px-4 py-3 border border-[#3F3F3F]">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-6">
                    Loading orders...
                  </td>
                </tr>
              ) : paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6">
                    No orders found
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="text-[16px] text-[#0F0F0F] font-medium"
                  >
                    <td className="px-4 py-4 border border-[#3F3F3F]">
                      {order?.items[0]?.title}
                    </td>
                    <td className="px-4 py-4 border border-[#3F3F3F]">
                      {order.items[0]?.totalCoin !== undefined
                        ? order?.items[0]?.totalCoin.toFixed()
                        : "-"}
                    </td>
                    {/* <td className="px-4 py-4 border border-[#3F3F3F]">
                      {order.name ? order.name : "No-Name"}
                    </td> */}
                    {/* <td className="px-4 py-4 border border-[#3F3F3F]">
                      {order.shop}
                    </td> */}
                    <td className="px-4 py-4 border  border-[#3F3F3F]">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-medium ${
                          order.status === "pending"
                            ? "bg-orange-100 text-orange-800"
                            : order.status === "approved" ||
                              order.status === "delivered"
                            ? "bg-green-600 text-white"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm bg-transparent ">
                      <Button
                        onClick={() => setSelectedOrder(order)}
                        className="px-5 bg-transparent text-[#424242] hover:underline shadow-none"
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t">
          <div className="text-sm text-gray-500">
            Showing page {currentPage} of {totalPages}
          </div>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </Card>

      {/* ✅ Modal for order details */}
    <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
  <DialogContent className="max-w-3xl bg-white rounded-2xl shadow-2xl p-8">
    {/* Header */}
    <DialogHeader className="border-b pb-4 mb-6">
      <DialogTitle className="text-2xl font-bold text-gray-900">
        Order Details
      </DialogTitle>
      <DialogDescription className="text-sm text-gray-500">
        Order ID: <span className="font-mono">{selectedOrder?._id}</span>
      </DialogDescription>
    </DialogHeader>

    {selectedOrder && (
      <div className="space-y-6 text-gray-700">
        {/* Order Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <p>
            <span className="font-semibold text-gray-800">Status:</span>{" "}
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                selectedOrder.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : selectedOrder.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {selectedOrder.status}
            </span>
          </p>
          <p>
            <span className="font-semibold text-gray-800">Employee:</span>{" "}
            {selectedOrder.employee ?? "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Employee Name:</span>{" "}
            {selectedOrder?.name
              ? selectedOrder?.name
              : "You don't use your Name"}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Shop:</span>{" "}
            {selectedOrder.shop}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Created At:</span>{" "}
            {new Date(selectedOrder.createdAt).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Updated At:</span>{" "}
            {new Date(selectedOrder.updatedAt).toLocaleString()}
          </p>
        </div>

        {/* Items */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ordered Items
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {selectedOrder.items.map((item) => (
              <div
                key={item._id}
                className="rounded-xl border bg-white p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition"
              >
                {/* Centered Image */}
                <div className="flex justify-center w-full mb-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-32 h-32 object-cover rounded-lg border"
                    width={128}
                    height={128}
                  />
                </div>
                <p className="font-medium text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-600">
                  Price:{" "}
                  <span className="font-semibold text-gray-800">
                    {item.price}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Quantity:{" "}
                  <span className="font-semibold text-gray-800">
                    {item.quantity}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Total Coin:{" "}
                  <span className="font-semibold text-gray-800">
                    {item.totalCoin}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </DialogContent>
</Dialog>


    </div>
  );
}
