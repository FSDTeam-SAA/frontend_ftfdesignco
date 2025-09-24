/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { companyPyament, fetchMySales } from "@/lib/api";
import { PaymentPayload } from "@/lib/types";

export const useSales = (onPaymentSuccess?: () => void) => {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [queryTerm, setQueryTerm] = useState("");

  const salesQuery = useQuery({
    queryKey: ["mySales", queryTerm],
    queryFn: () => fetchMySales(queryTerm),
    enabled: true,
  });

  const paymentMutation = useMutation({
    mutationFn: (payload: PaymentPayload) => companyPyament(payload),
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: (data: any) => {
      toast.success(data.message);
      onPaymentSuccess?.();
      salesQuery.refetch();
    },
  });

  const handleSearch = () => {
    setQueryTerm(searchTerm);
    salesQuery.refetch();
  };

  const handleReset = () => {
    setSearchTerm("");
    setQueryTerm("");
    salesQuery.refetch();
  };

  const handlePayment = () => {
    if (!session?.user?._id) {
      toast.error("User session not found");
      return;
    }

    const payload: PaymentPayload = {
      type: "payOrder",
      totalProductPrice: salesQuery.data?.totalProductPrice ?? 0,
      shopId: session.user._id,
    };

    paymentMutation.mutate(payload);
  };

  return {
    // State
    searchTerm,
    setSearchTerm,
    queryTerm,

    // Query data
    salesData: salesQuery.data,
    isLoading: salesQuery.isLoading,
    error: salesQuery.error,

    // Mutations
    isPaymentLoading: paymentMutation.isPending,

    // Actions
    handleSearch,
    handleReset,
    handlePayment,
    refetch: salesQuery.refetch,
  };
};
