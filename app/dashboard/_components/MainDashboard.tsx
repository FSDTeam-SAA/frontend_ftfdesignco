"use client"


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Package, BarChart3, PieChart } from "lucide-react"
import { Breadcrumb } from "./breadcrumb"
import { StatsCard } from "./stats-card"

export default function MainDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
        <Breadcrumb items={[{ label: "Dashboard" }]} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard title="Total Used Coins" value="132,570" icon={TrendingUp} color="green" />
        <StatsCard title="Live Product" value="120" icon={Package} color="orange" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coins Report */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Coins Report</CardTitle>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
              Month
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <BarChart3 className="h-32 w-32 text-gray-300" />
            </div>
          </CardContent>
        </Card>

        {/* Total New Products Report */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Total New Products Report</CardTitle>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>This day</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <span>This Week</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-teal-600"></div>
                <span>This Month</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <PieChart className="h-32 w-32 text-gray-300" />
            </div>
          </CardContent>
        </Card>

        {/* Product Sell */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Product Sell</CardTitle>
            <Button variant="link" className="text-blue-600 p-0">
              View Details →
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Categories name 39%</span>
                <div className="w-16 h-2 bg-green-500 rounded"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Categories name 38%</span>
                <div className="w-16 h-2 bg-blue-500 rounded"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Categories name 23%</span>
                <div className="w-16 h-2 bg-teal-500 rounded"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Categories name 22%</span>
                <div className="w-16 h-2 bg-orange-500 rounded"></div>
              </div>
            </div>
            <div className="mt-6 h-32 flex items-center justify-center">
              <PieChart className="h-24 w-24 text-gray-300" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
