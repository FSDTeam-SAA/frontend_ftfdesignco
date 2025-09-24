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
                <th className="px-4 py-3 border border-[#3F3F3F]">Employee</th>
                <th className="px-4 py-3 border border-[#3F3F3F]">Shop</th>
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
                    <td className="px-4 py-4 border border-[#3F3F3F]">
                      {order.name ? order.name : "No-Name"}
                    </td>
                    <td className="px-4 py-4 border border-[#3F3F3F]">
                      {order.shop}
                    </td>
                    <td className="px-4 py-4 border border-[#3F3F3F]">
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
      <Dialog
        open={!!selectedOrder}
        onOpenChange={() => setSelectedOrder(null)}
      >
        <DialogContent className="max-w-2xl bg-white rounded-sm">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Order ID: {selectedOrder?._id}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>
              <p>
                <strong>Employee:</strong> {selectedOrder.employee ?? "N/A"}
              </p>
              <p>
                <strong>Employee Name:</strong> {selectedOrder?.name ? selectedOrder?.name : "You don't use your Name"}
              </p>
              <p>
                <strong>Shop:</strong> {selectedOrder.shop}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedOrder.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {new Date(selectedOrder.updatedAt).toLocaleString()}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedOrder.items.map((item) => (
                  <div
                    key={item._id}
                    className="border p-3 rounded-lg flex flex-col items-center"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="w-32 h-32 object-cover rounded-md mb-2"
                      width={40}
                      height={40}
                    />
                    <p className="font-medium">{item.title}</p>
                    <p>Price: {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Total Coin: {item.totalCoin}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
