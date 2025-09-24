"use client";

import { Coins, TableProperties } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SalesSearchBar } from "./SalesSearchBar";
import { SalesTable } from "./SalesTable";
import { SalesComponentProps } from "@/lib/types";
import { useSales } from "@/hooks/useSales";
import { Breadcrumb } from "../../_components/breadcrumb";
import { SalesStatsCard } from "./sales-stats-card";

export const SalesComponent: React.FC<SalesComponentProps> = ({
  title = "My Sales",
  showPaymentButton = true,
  showSearch = true,
  searchPlaceholder,
  onPayment,
  onSearch,
  customColumns,
  className = "",
}) => {
  const {
    searchTerm,
    setSearchTerm,
    salesData,
    isLoading,
    error,
    isPaymentLoading,
    handleSearch,
    handleReset,
    handlePayment,
  } = useSales();

  const handleSearchAction = () => {
    handleSearch();
    onSearch?.(searchTerm);
  };

  const handlePaymentAction = () => {
    if (onPayment && salesData) {
      const payload = {
        type: "payOrder",
        totalProductPrice: salesData.totalProductPrice ?? 0,
        shopId: "", // This should be passed from parent or session
      };
      onPayment(payload);
    } else {
      handlePayment();
    }
  };

  const salesItems = salesData?.data || [];

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <Breadcrumb items={[{ label: "Dashboard" }, { label: "My Wallet" }]} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <SalesStatsCard
          title="Total Product"
          value={salesData?.totalProducts ?? 0}
          icon={<TableProperties className="h-8 w-8 opacity-75" />}
        />
        <SalesStatsCard
          title="Total Used Coins"
          value={salesData?.totalUserCoin ?? 0}
          icon={<Coins className="h-8 w-8 opacity-75" />}
        />
        <SalesStatsCard
          title="Total Product Price"
          value={`$${(salesData?.totalProductPrice ?? 0).toFixed(2)}`}
          icon={<Coins className="h-8 w-8 opacity-75" />}
        />
      </div>

      {showPaymentButton && (
        <div>
          <Button
            className="bg-[#035F8A] text-white hover:text-black rounded-xl px-14 py-4"
            onClick={handlePaymentAction}
            disabled={isPaymentLoading}
          >
            {isPaymentLoading ? "Processing..." : "Payment"}
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {showSearch && (
          <SalesSearchBar
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            onSearch={handleSearchAction}
            onReset={handleReset}
            placeholder={searchPlaceholder}
          />
        )}

        <SalesTable
          data={salesItems}
          columns={customColumns}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};
