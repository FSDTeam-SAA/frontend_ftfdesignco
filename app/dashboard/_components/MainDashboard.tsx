"use client";

import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { TrendingUp, Package } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ProductSellChart } from "./product-sell";
import NewProductsChart from "./new-products-chart";
import CoinsReportDashboard from "./coin-report";

// Breadcrumb Component (moved from components/breadcrumb.tsx)
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
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
  );
}

// StatsCard Component (moved from components/stats-card.tsx)
interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: "green" | "orange";
}

function StatsCard({ title, value, icon: Icon, color }: StatsCardProps) {
  const colorClasses = {
    green: "text-green-600",
    orange: "text-orange-600",
  };

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
  );
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
        <StatsCard
          title="Total Used Coins"
          value="132,570"
          icon={TrendingUp}
          color="green"
        />
        <StatsCard
          title="Live Product"
          value="120"
          icon={Package}
          color="orange"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coins Report */}

        {/* Total New Products Report */}
        <NewProductsChart />

        {/* Product Sell */}
        <ProductSellChart />
      </div>
      <CoinsReportDashboard />
    </div>
  );
}
