"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Package } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { LucideIcon } from "lucide-react"

// Breadcrumb Component (moved from components/breadcrumb.tsx)
interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="text-sm text-gray-500">
      {items.map((item, index) => (
        <span key={index}>
          {index > 0 && " / "}
          {item.href ? (
            <a href={item.href} className="hover:text-gray-700">
              {item.label}
            </a>
          ) : (
            item.label
          )}
        </span>
      ))}
    </nav>
  )
}

// StatsCard Component (moved from components/stats-card.tsx)
interface StatsCardProps {
  title: string
  value: string
  icon: LucideIcon
  color: "green" | "orange"
}

function StatsCard({ title, value, icon: Icon, color }: StatsCardProps) {
  const colorClasses = {
    green: "text-green-600",
    orange: "text-orange-600",
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className={`text-2xl font-bold ${colorClasses[color]}`}>
              {color === "green" && "●"} {value}
            </p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">
            <Icon className="h-6 w-6 text-gray-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Dummy data for charts
const coinsData = [
  { date: "3 Oct", value: 0 },
  { date: "10 Oct", value: 1200 },
  { date: "14 Oct", value: 1000 },
  { date: "20 Oct", value: 2800 },
  { date: "23 Oct", value: 3800 },
  { date: "27 Oct", value: 3000 },
  { date: "30 Oct", value: 2000 },
]

const newProductsData = [
  { name: "This day", value: 25, color: "#4f46e5" },
  { name: "This Week", value: 45, color: "#93c5fd" },
  { name: "This Month", value: 30, color: "#e5e7eb" },
]

const productSellData = [
  { name: "Categories name", value: 39, color: "#10b981" },
  { name: "Categories name", value: 38, color: "#3b82f6" },
  { name: "Categories name", value: 27, color: "#f59e0b" },
  { name: "Categories name", value: 22, color: "#eab308" },
]

const chartConfig = {
  coins: {
    label: "Coins",
    color: "hsl(var(--chart-1))",
  },
  newProducts: {
    label: "New Products",
    color: "hsl(var(--chart-2))",
  },
  productSell: {
    label: "Product Sales",
    color: "hsl(var(--chart-3))",
  },
}

export default function MainDashboard() {
  return (
    <div className="space-y-6 p-6">
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
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={coinsData}>
                  <CartesianGrid vertical={false} stroke="#e5e7eb" strokeDasharray="3 3" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickFormatter={(value) => (value === 0 ? "0" : `${value / 1000}k`)}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#a855f7"
                    strokeWidth={2}
                    dot={{ fill: "#a855f7", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: "#a855f7" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
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
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={newProductsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={50}
                    dataKey="value"
                    startAngle={180}
                    endAngle={-180}
                    paddingAngle={5}
                    cornerRadius={5}
                  >
                    {newProductsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Pie
                    data={newProductsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={65}
                    dataKey="value"
                    startAngle={180}
                    endAngle={-180}
                    paddingAngle={5}
                    cornerRadius={5}
                  >
                    {newProductsData.map((entry, index) => (
                      <Cell key={`cell-outer-${index}`} fill={entry.color} opacity={0.7} />
                    ))}
                  </Pie>
                  <Pie
                    data={newProductsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={80}
                    dataKey="value"
                    startAngle={180}
                    endAngle={-180}
                    paddingAngle={5}
                    cornerRadius={5}
                  >
                    {newProductsData.map((entry, index) => (
                      <Cell key={`cell-outer-outer-${index}`} fill={entry.color} opacity={0.5} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
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
            <div className="space-y-3 mb-6">
              {productSellData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">
                    {item.name} {item.value}%
                  </span>
                  <div className="w-16 h-2 rounded" style={{ backgroundColor: item.color }}></div>
                </div>
              ))}
            </div>
            <ChartContainer config={chartConfig} className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productSellData}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={35}
                    dataKey="value"
                    startAngle={180}
                    endAngle={-180}
                    paddingAngle={5}
                    cornerRadius={5}
                  >
                    {productSellData.map((entry, index) => (
                      <Cell key={`inner-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Pie
                    data={productSellData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={50}
                    dataKey="value"
                    startAngle={180}
                    endAngle={-180}
                    paddingAngle={5}
                    cornerRadius={5}
                  >
                    {productSellData.map((entry, index) => (
                      <Cell key={`outer-${index}`} fill={entry.color} opacity={0.8} />
                    ))}
                  </Pie>
                  <Pie
                    data={productSellData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={65}
                    dataKey="value"
                    startAngle={180}
                    endAngle={-180}
                    paddingAngle={5}
                    cornerRadius={5}
                  >
                    {productSellData.map((entry, index) => (
                      <Cell key={`outer-outer-${index}`} fill={entry.color} opacity={0.6} />
                    ))}
                  </Pie>
                  <Pie
                    data={productSellData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={80}
                    dataKey="value"
                    startAngle={180}
                    endAngle={-180}
                    paddingAngle={5}
                    cornerRadius={5}
                  >
                    {productSellData.map((entry, index) => (
                      <Cell key={`outer-outer-outer-${index}`} fill={entry.color} opacity={0.4} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
