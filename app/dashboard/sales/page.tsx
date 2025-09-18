"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Coins, TableProperties } from "lucide-react";
import { Breadcrumb } from "../_components/breadcrumb";
import { SaleItem } from "@/lib/types";
import { fetchMySales } from "@/lib/api";
import Image from "next/image";

export default function MySalesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [queryTerm, setQueryTerm] = useState("");
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["mySales", queryTerm],
    queryFn: () => fetchMySales(queryTerm),
    enabled: false,
  });

  const salesData: SaleItem[] = data?.data || [];

  const columns = [
    {
      key: "EmployeId",
      header: "Employee Id",
      render: (item: SaleItem) => item.employees[0].employeeId,
    },
    {
      key: "productName",
      header: "Product Name",
      render: (item: SaleItem) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
            <Image
              src={item.image}
              alt={item.productName}
              className="w-full h-full object-cover"
              height={40}
              width={40}
            />
          </div>
          <span className="font-medium">{item.productName}</span>
        </div>
      ),
    },
    {
      key: "quantity",
      header: "Quantity",
      render: (item: SaleItem) => item.quantity,
    },
    {
      key: "coins",
      header: "Coins",
      render: (item: SaleItem) => item.coins,
    },
    {
      key: "totalPrice",
      header: "Total Price",
      render: (item: SaleItem) => `$${item.totalPrice}`,
    },
  ];

  const handleSearch = () => {
    setQueryTerm(searchTerm); // Set the query term
    refetch(); // Trigger fetch
  };

  const handleReset = () => {
    setSearchTerm("");
    setQueryTerm("");
    refetch();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Sales</h1>
        <Breadcrumb items={[{ label: "Dashboard" }, { label: "My Wallet" }]} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-teal-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Used Coins</p>
                <p className="text-3xl font-bold">{data?.totalProducts ?? 0}</p>
              </div>
              <TableProperties className="h-8 w-8 opacity-75" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-teal-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Used Coins</p>
                <p className="text-3xl font-bold">{data?.totalUserCoin ?? 0}</p>
              </div>
              <Coins className="h-8 w-8 opacity-75" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-teal-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Used Coins</p>
                <p className="text-3xl font-bold">
                  {data?.totalProductPrice ?? 0}
                </p>
              </div>
              <Coins className="h-8 w-8 opacity-75" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="  flex items-center justify-end gap-2">
          <Input
            placeholder="Enter Employee ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-48"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Button variant="outline" onClick={handleSearch}>
            Search
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>

        <div className="bg-white rounded-lg border min-h-[200px]">
          {isLoading ? (
            <p className="p-4">Loading...</p>
          ) : error ? (
            <p className="p-4 text-red-500">Failed to load sales.</p>
          ) : salesData.length === 0 ? (
            <p className="p-4 text-center text-gray-500 font-medium">
              Don’t have sales data
            </p>
          ) : (
            <div>
              <DataTable data={salesData} columns={columns} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
