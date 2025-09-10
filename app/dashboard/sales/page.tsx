"use client"

import { useState } from "react"
import { DataTable } from "@/components/ui/data-table"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TrendingUp } from "lucide-react"
import { Breadcrumb } from "../_components/breadcrumb"

// Mock data for sales
const salesData = [
  { productName: "T-Shirt", quantity: 4, coins: 200 },
  { productName: "T-Shirt", quantity: 4, coins: 200 },
  { productName: "T-Shirt", quantity: 4, coins: 200 },
  { productName: "T-Shirt", quantity: 4, coins: 200 },
  { productName: "T-Shirt", quantity: 4, coins: 200 },
]

export default function MySalesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const columns = [
    {
      key: "productName",
      header: "Product Name",
      // eslint-disable-next-line
      render: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">EK</span>
          </div>
          <span className="font-medium">{item.productName}</span>
        </div>
      ),
    },
    {
      key: "quantity",
      header: "Quantity",
      // eslint-disable-next-line
      render: (item: any) => item.quantity,
    },
    {
      key: "coins",
      header: "Coins",
      // eslint-disable-next-line
      render: (item: any) => item.coins,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Sales</h1>
        <Breadcrumb items={[{ label: "Dashboard" }, { label: "My Wallet" }]} />
      </div>

      {/* Total Used Coins Card */}
      <Card className="bg-teal-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Used Coins</p>
              <p className="text-3xl font-bold">12000</p>
            </div>
            <TrendingUp className="h-8 w-8 opacity-75" />
          </div>
        </CardContent>
      </Card>

      {/* Products History */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Products History</h2>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Enter Product ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-48"
            />
            <Button variant="outline">Reset</Button>
          </div>
        </div>

        <div className="bg-white rounded-lg border">
          <DataTable data={salesData} columns={columns} />
        </div>
      </div>
    </div>
  )
}
