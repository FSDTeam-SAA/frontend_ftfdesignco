"use client";

import { PaymentPayload } from "@/lib/types";
import { SalesComponent } from "./my-sales";


export default function MySalesPage() {
  return <SalesComponent />;
}

// Usage example with customization:
export function CustomSalesPage() {
  const handleCustomPayment = (payload: PaymentPayload) => {
    console.log("Custom payment logic", payload);
    // Your custom payment logic here
  };

  const handleCustomSearch = (query: string) => {
    console.log("Custom search logic", query);
    // Your custom search logic here
  };

  return (
    <SalesComponent
      title="Custom Sales Dashboard"
      showPaymentButton={true}
      showSearch={true}
      searchPlaceholder="Search by employee..."
      onPayment={handleCustomPayment}
      onSearch={handleCustomSearch}
      className="custom-sales-wrapper"
    />
  );
}
