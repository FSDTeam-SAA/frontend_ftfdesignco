"use client";
import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Trash2, Coins } from "lucide-react";
import { Breadcrumb } from "../../_components/breadcrumb";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";
import { AddEmployeeDialog } from "./add-employee-dialog";
import { UpdateEmployeeDialog } from "./update-employee-dialog";
import { AddCoinsDialog } from "./add-coins-dialog";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Interfaces for type safety
interface Shop {
  _id: string;
  companyId: string;
  companyName: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Employee {
  _id: string;
  name: string;
  email: string;
  employeeId: string;
  coin: number;
  shop?: Shop;
  userId: User;
  totalOrder: number;
  remainingCoin: number;
}

export default function EmployeesList() {
  const { data: session, status } = useSession();
  const token = session?.accessToken;
  const queryClient = useQueryClient();

  // Dialog states
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isCoinsDialogOpen, setIsCoinsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Selected employee states
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null
  );

  // Fetch employees
  const {
    data: employees = [],
    isLoading,
    error,
  } = useQuery<Employee[], Error>({
    queryKey: ["employees"],
    queryFn: async () => {
      if (!token) throw new Error("No authentication token");
      const response = await fetch(`${API_BASE_URL}/employee`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch employees: ${response.statusText}`);
      }
      const data = await response.json();
      return data.data as Employee[];
    },
    enabled: !!token,
    retry: 1,
  });

  // Delete employee mutation
  const deleteEmployee = useMutation({
    mutationFn: async (employeeId: string) => {
      const response = await fetch(`${API_BASE_URL}/employee/remove/${employeeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success(data.message);
      setIsDeleteDialogOpen(false);
      setEmployeeToDelete(null);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete employee");
      setIsDeleteDialogOpen(false);
      setEmployeeToDelete(null);
    },
  });

  // Action handlers
  // const handleUpdateClick = useCallback((employee: Employee) => {
  //   setSelectedEmployee(employee)
  //   setIsUpdateDialogOpen(true)
  // }, [])

  const handleCoinsClick = useCallback((employee: Employee) => {
    setSelectedEmployee(employee);
    setIsCoinsDialogOpen(true);
  }, []);

  const handleDeleteClick = useCallback((employee: Employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteDialogOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (employeeToDelete) {
      deleteEmployee.mutate(employeeToDelete._id);
    }
  }, [employeeToDelete, deleteEmployee]);

  const handleDeleteCancel = useCallback(() => {
    setIsDeleteDialogOpen(false);
    setEmployeeToDelete(null);
  }, []);

  // Column definitions
  const columns = [
    {
      key: "employeeId",
      header: "Employee ID",
      render: (item: Employee) => item.employeeId,
    },
    {
      key: "name",
      header: "Name",
      render: (item: Employee) => item.name,
    },
    {
      key: "email",
      header: "Email",
      render: (item: Employee) => item.email,
    },
    {
      key: "coin",
      header: "Coins",
      render: (item: Employee) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
          {item.coin}
        </span>
      ),
    },
        {
      key: "remainingCoin",
      header: "RemainingCoin",
      render: (item: Employee) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
          {item.remainingCoin}
        </span>
      ),
    },
        {
      key: "totalOrder",
      header: "TotalOrder",
      render: (item: Employee) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
          {item.totalOrder}
        </span>
      ),
    },
    {
      key: "company",
      header: "Company",
      render: (item: Employee) => item.shop?.companyName ?? "N/A",
    },
    {
      key: "action",
      header: "Actions",
      render: (item: Employee) => (
        <div className="flex justify-center items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleCoinsClick(item)}
            className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
          >
            <Coins className="h-4 w-4 mr-1" /> Add Coins
          </Button>
          {/* <Button
            size="sm"
            variant="outline"
            onClick={() => handleUpdateClick(item)}
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <Edit className="h-4 w-4 mr-1" />
          </Button> */}
          <Button className="h-4 w-4 mr-1 hover:bg-yellow-50"
            size="sm"
            variant="destructive"
            onClick={() => handleDeleteClick(item)}
            disabled={deleteEmployee.isPending}
          >
            <Trash2 className="h-4 w-4 mr-1 hover:bg-yellow-50" />
          </Button>
        </div>
      ),
    },
  ];

  // Loading state
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading session...</p>
        </div>
      </div>
    );
  }

  // Authentication check
  if (!token) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Authentication required</p>
        <p className="text-gray-400 text-sm mt-1">
          Please log in to view employees.
        </p>
      </div>
    );
  }

  // Loading employees
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading employees...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Error loading employees</p>
        <p className="text-gray-400 text-sm mt-1">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <Breadcrumb
            items={[{ label: "Dashboard" }, { label: "Employees" }]}
          />
        </div>
        {token && <AddEmployeeDialog token={token} apiBaseUrl={API_BASE_URL} />}
      </div>

      {/* Update Employee Dialog */}
      <UpdateEmployeeDialog
        isOpen={isUpdateDialogOpen}
        onClose={() => {
          setIsUpdateDialogOpen(false);
          setSelectedEmployee(null);
        }}
        employee={selectedEmployee}
        token={token || ""}
        apiBaseUrl={API_BASE_URL}
      />

      {/* Add Coins Dialog */}
      <AddCoinsDialog
        isOpen={isCoinsDialogOpen}
        onClose={() => {
          setIsCoinsDialogOpen(false);
          setSelectedEmployee(null);
        }}
        employee={selectedEmployee}
        token={token || ""}
        apiBaseUrl={API_BASE_URL}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Employee"
        itemName={employeeToDelete?.name}
        description={`Are you sure you want to delete ${employeeToDelete?.name}? This will permanently remove the employee and all associated data.`}
        isLoading={deleteEmployee.isPending}
      />

      <div className="bg-white rounded-lg border shadow-sm">
        {employees.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No employees found</p>
            <p className="text-gray-400 text-sm mt-1">
              Add new employees to get started
            </p>
          </div>
        ) : (
          <DataTable data={employees} columns={columns} />
        )}
      </div>
    </div>
  );
}
