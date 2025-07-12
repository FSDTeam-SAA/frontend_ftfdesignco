"use client"

import type React from "react"

import { useState } from "react"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Upload } from "lucide-react"
import { useEmployees, useCreateEmployee } from "@/hooks/use-api"
import { Breadcrumb } from "../_components/breadcrumb"

export default function EmployeesPage() {
  const { data: employees = [], isLoading } = useEmployees()
  const createEmployee = useCreateEmployee()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    employeeId: "",
    coins: "",
    companyName: "",
    companyAddress: "",
  })

  const columns = [
    {
      key: "employeeId",
      header: "Employee ID",
      render: (item: any) => item.employeeId || "2201",
    },
    {
      key: "name",
      header: "Name",
      render: (item: any) => item.name,
    },
    {
      key: "email",
      header: "Email",
      render: (item: any) => item.email,
    },
    {
      key: "pendingOrder",
      header: "Pending Order",
      render: () => "10",
    },
    {
      key: "action",
      header: "Action",
      render: () => (
        <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
          Details
        </Button>
      ),
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createEmployee.mutate(formData, {
      onSuccess: () => {
        setIsDialogOpen(false)
        setFormData({ employeeId: "", coins: "", companyName: "", companyAddress: "" })
      },
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employee</h1>
          <Breadcrumb items={[{ label: "Dashboard" }, { label: "Employee" }]} />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Your Employee Details</DialogTitle>
              <p className="text-sm text-gray-600">Please enter details of your Employee</p>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="employeeId">Employee Id</Label>
                <Input
                  id="employeeId"
                  placeholder="Enter your company id"
                  value={formData.employeeId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, employeeId: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="coins">Coins</Label>
                <Input
                  id="coins"
                  placeholder="Enter Coins for your employee"
                  value={formData.coins}
                  onChange={(e) => setFormData((prev) => ({ ...prev, coins: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Enter your company name"
                  value={formData.companyName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="companyAddress">Company Address</Label>
                <Input
                  id="companyAddress"
                  placeholder="Enter your company address"
                  value={formData.companyAddress}
                  onChange={(e) => setFormData((prev) => ({ ...prev, companyAddress: e.target.value }))}
                />
              </div>
              <div>
                <Label>Image</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Drag and drop images here or click to upload files</p>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600"
                disabled={createEmployee.isPending}
              >
                {createEmployee.isPending ? "Creating..." : "Confirm"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg border">
        <DataTable data={employees} columns={columns} />
      </div>
    </div>
  )
}
