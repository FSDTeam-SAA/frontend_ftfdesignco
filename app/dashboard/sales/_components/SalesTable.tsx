/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "@/components/ui/data-table";
import { SaleItem, SalesTableColumn } from "@/lib/types";
import Image from "next/image";

interface SalesTableProps {
  data: SaleItem[];
  columns?: SalesTableColumn[];
  isLoading: boolean;
  error: any;
}

const defaultColumns: SalesTableColumn[] = [
  {
    key: "employeeId",
    header: "Employee Id",
    render: (item: SaleItem) => item.employees[0]?.employeeId || "N/A",
  },
  {
    key: "productName",
    header: "Product Name",
    render: (item: SaleItem) => (
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
          <Image
            src={item.image}
            alt={item.productName}
            className="w-full h-full object-cover"
            height={40}
            width={40}
          />
        </div>
        <span className="font-medium">{item.productName}</span>
      </div>
    ),
  },
  {
    key: "quantity",
    header: "Quantity",
    render: (item: SaleItem) => item.quantity,
  },
  {
    key: "coins",
    header: "Coins",
    render: (item: SaleItem) => item.coins,
  },
  {
    key: "totalPrice",
    header: "Total Price",
    render: (item: SaleItem) => `$${item.totalPrice.toFixed(2)}`,
  },
];

export const SalesTable: React.FC<SalesTableProps> = ({
  data,
  columns = defaultColumns,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border min-h-[200px] flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border min-h-[200px] flex items-center justify-center">
        <p className="text-red-500">Failed to load sales data.</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg border min-h-[200px] flex items-center justify-center">
        <p className="text-center text-gray-500 font-medium">
          No sales data available
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border min-h-[200px]">
      <DataTable data={data} columns={columns} />
    </div>
  );
};
