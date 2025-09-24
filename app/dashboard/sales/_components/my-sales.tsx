"use client";

import { Coins, TableProperties } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SalesSearchBar } from "./SalesSearchBar";
import { SalesTable } from "./SalesTable";
import { SalesComponentProps } from "@/lib/types";
import { useSales } from "@/hooks/useSales";
import { Breadcrumb } from "../../_components/breadcrumb";
import { SalesStatsCard } from "./sales-stats-card";
import StripeProvider from "@/components/provider/StripeProvider";
import PaymentForm from "@/components/shared/PaymentForm";
import { useSession } from "next-auth/react";
import { useState } from "react";

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
  } = useSales();

  const {data: session} = useSession();
  const token = session?.accessToken;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const handleSearchAction = () => {
    handleSearch();
    onSearch?.(searchTerm);
  };
  // console.log(salesData.totalProductPrice);

  const createPaymentIntent = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/create-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({
            type: "payOrder",
            totalProductPrice: salesData?.totalProductPrice ?? 0,
            shopId: session?.user?._id ?? "",
          }),
        }
      );
      // type: string;
      // totalProductPrice: number;
      // shopId: string;
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create payment intent");
      }

      const data = await response.json();
      if (data.success && data.clientSecret) {
        setClientSecret(data.clientSecret);
        setIsDialogOpen(true);
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
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
      createPaymentIntent();
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[800px] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-center">
              Complete Your Payment
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg">Total Payment</h3>
              <p className="text-2xl font-bold text-blue-600">
                ${salesData?.totalProductPrice?.toFixed(2) ?? "0.00"}
              </p>
            </div>

            {clientSecret && (
              <StripeProvider clientSecret={clientSecret}>
                <PaymentForm
                  amount={salesData?.totalProductPrice ?? 0}
                  clientSecret={clientSecret}
                  token={token}
                  onSuccess={() => setIsDialogOpen(false)}
                  onCancel={() => setIsDialogOpen(false)}
                />
              </StripeProvider>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
