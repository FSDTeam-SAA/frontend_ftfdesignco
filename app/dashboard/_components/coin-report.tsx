import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  TooltipProps,
} from "recharts";
import { Coins, TrendingUp, ShoppingCart, Calendar } from "lucide-react";
import { useSession } from "next-auth/react";

// Types and Interfaces
interface CoinsReportData {
  label: string;
  totalCoinsUsed: number;
  orderCount: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  filterBy: string;
  data: CoinsReportData[];
}

interface Stats {
  totalCoins: number;
  totalOrders: number;
  avgCoinsPerOrder: number;
}

type FilterType = "daily" | "weekly" | "monthly";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  size?: "default" | "sm" | "lg";
  className?: string;
  variant?: "default" | "outline" | "ghost";
  disabled?: boolean;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color?: "blue" | "purple" | "green" | "orange";
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{
    color: string;
    name: string;
    value: number;
  }>;
  label?: string;
}

// API function with proper typing
const fetchCoinsReport = async (
  filterBy: FilterType = "weekly",
  token: string
): Promise<ApiResponse> => {
  // Replace this URL with your actual API endpoint
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/dashboard/coin-report?filterBy=${filterBy}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(token);
  if (!response.ok) {
    throw new Error("Failed to fetch coins report");
  }

  return response.json() as Promise<ApiResponse>;
};

// Custom Card components
const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}
  >
    {children}
  </div>
);

const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = "",
}) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

const CardTitle: React.FC<CardTitleProps> = ({ children, className = "" }) => (
  <h3
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
  >
    {children}
  </h3>
);

const CardContent: React.FC<CardContentProps> = ({
  children,
  className = "",
}) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  size = "default",
  className = "",
  variant = "default",
  disabled = false,
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
  };

  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// Custom Tooltip Component with proper typing
const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900">{`Period: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Stats Card Component with proper typing
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  color = "blue",
}) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    green: "bg-green-50 text-green-600 border-green-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full border ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

// Loading Spinner Component
const LoadingSpinner: React.FC<{ color?: string }> = ({
  color = "orange-500",
}) => (
  <div
    className={`animate-spin rounded-full h-8 w-8 border-b-2 border-${color}`}
  />
);

// Error Component
const ErrorDisplay: React.FC<{ error: Error; onRetry: () => void }> = ({
  error,
  onRetry,
}) => (
  <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
    <div className="flex items-center space-x-2">
      <div className="text-red-600">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <p className="text-red-800 font-medium">Failed to load coins report</p>
    </div>
    <p className="text-red-600 text-sm mt-1">{error.message}</p>
    <Button
      onClick={onRetry}
      className="mt-3 bg-red-600 hover:bg-red-700 text-white"
      size="sm"
    >
      Try Again
    </Button>
  </div>
);

// Chart Loading Component
const ChartLoading: React.FC<{ height?: string; color?: string }> = ({
  height = "h-64",
  color = "orange-500",
}) => (
  <div className={`${height} flex items-center justify-center`}>
    <LoadingSpinner color={color} />
  </div>
);

const CoinsReportDashboard: React.FC = () => {
  const [filterBy, setFilterBy] = useState<FilterType>("weekly");
  const { data: session } = useSession();
  // TanStack Query for fetching data with proper typing
  const { data, isLoading, error, refetch } = useQuery<ApiResponse, Error>({
    queryKey: ["coinsReport", filterBy],
    queryFn: () => fetchCoinsReport(filterBy, session?.accessToken || ""),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Calculate totals for stats with proper typing
  const stats: Stats = useMemo(() => {
    if (!data?.data)
      return { totalCoins: 0, totalOrders: 0, avgCoinsPerOrder: 0 };

    const totalCoins = data.data.reduce(
      (sum, item) => sum + item.totalCoinsUsed,
      0
    );
    const totalOrders = data.data.reduce(
      (sum, item) => sum + item.orderCount,
      0
    );
    const avgCoinsPerOrder =
      totalOrders > 0 ? Math.round(totalCoins / totalOrders) : 0;

    return { totalCoins, totalOrders, avgCoinsPerOrder };
  }, [data]);

  const handleFilterChange = (newFilter: FilterType): void => {
    setFilterBy(newFilter);
  };

  const handleRetry = (): void => {
    void refetch();
  };

  // Filter options with proper typing
  const filterOptions: FilterType[] = ["daily", "weekly", "monthly"];

  if (error) {
    return <ErrorDisplay error={error} onRetry={handleRetry} />;
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Coins Report</h1>
          <p className="text-gray-600 mt-1">
            Track your coin usage and order metrics
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2">
          {filterOptions.map((filter) => (
            <Button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              // variant={filterBy === filter ? "default" : "outline"}
              size="sm"
              className={
                filterBy === filter
                  ? "!bg-blue-500 hover:bg-orange-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }
            >
              <Calendar className="h-4 w-4 mr-2" />
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Coins Used"
          value={isLoading ? "..." : stats.totalCoins.toLocaleString()}
          icon={Coins}
          color="orange"
        />
        <StatCard
          title="Total Orders"
          value={isLoading ? "..." : stats.totalOrders.toLocaleString()}
          icon={ShoppingCart}
          color="blue"
        />
        <StatCard
          title="Avg Coins/Order"
          value={isLoading ? "..." : stats.avgCoinsPerOrder}
          icon={TrendingUp}
          color="purple"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coins Usage Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Coins className="h-5 w-5 mr-2 text-orange-500" />
              Coins Usage Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <ChartLoading height="h-[250px]" color="orange-500" />
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data?.data || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="totalCoinsUsed"
                    stroke="#f97316"
                    strokeWidth={3}
                    dot={{ fill: "#f97316", strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, fill: "#f97316" }}
                    name="Coins Used"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Order Count Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2 text-blue-500" />
              Order Count
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <ChartLoading height="h-[250px]" color="blue-500" />
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data?.data || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="orderCount"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    name="Orders"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Combined Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
            Combined Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <ChartLoading height="h-80" color="purple-500" />
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={data?.data || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <YAxis
                  yAxisId="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  yAxisId="left"
                  dataKey="orderCount"
                  fill="#3b82f6"
                  opacity={0.7}
                  radius={[4, 4, 0, 0]}
                  name="Orders"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="totalCoinsUsed"
                  stroke="#f97316"
                  strokeWidth={3}
                  dot={{ fill: "#f97316", strokeWidth: 2, r: 5 }}
                  name="Coins Used"
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Data Table */}
      {!isLoading && data?.data && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Data Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Coins Used
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Orders
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avg Coins/Order
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.data.map((item, index) => (
                    <tr
                      key={`${item.label}-${index}`}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.label}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex items-center text-orange-600">
                          <Coins className="h-4 w-4 mr-1" />
                          {item.totalCoinsUsed}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.orderCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.orderCount > 0
                          ? Math.round(item.totalCoinsUsed / item.orderCount)
                          : 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CoinsReportDashboard;
