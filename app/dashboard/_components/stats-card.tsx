import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: "green" | "orange" | "blue"
}

export function StatsCard({ title, value, icon: Icon, trend, color = "green" }: StatsCardProps) {
  const colorClasses = {
    green: "text-green-600",
    orange: "text-orange-600",
    blue: "text-blue-600",
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {trend && (
              <p className={`text-sm ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
                {trend.isPositive ? "+" : "-"}
                {Math.abs(trend.value)}%
              </p>
            )}
          </div>
          <div className={`p-3 rounded-lg bg-gray-100 ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
