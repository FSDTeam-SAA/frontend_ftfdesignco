"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface Employee {
  _id: string
  name: string
  email: string
  employeeId: string
  coin: number
}

interface UpdateFormData {
  name: string
  email: string
  employeeId: string
}

interface UpdateEmployeeDialogProps {
  isOpen: boolean
  onClose: () => void
  employee: Employee | null
  token: string
  apiBaseUrl: string | undefined
}

export function UpdateEmployeeDialog({ isOpen, onClose, employee, token, apiBaseUrl }: UpdateEmployeeDialogProps) {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState<UpdateFormData>({
    name: "",
    email: "",
    employeeId: "",
  })

  // Update form data when employee changes
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        employeeId: employee.employeeId,
      })
    }
  }, [employee])

  const updateEmployee = useMutation({
    mutationFn: async (updateData: UpdateFormData) => {
      if (!employee) throw new Error("No employee selected")

      const response = await fetch(`${apiBaseUrl}api/v1/employee/update/${employee._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      })
      if (!response.ok) {
        throw new Error(`Failed to update employee: ${response.statusText}`)
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] })
      toast.success("Employee updated successfully")
      onClose()
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update employee")
    },
  })

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      updateEmployee.mutate(formData)
    },
    [formData, updateEmployee],
  )

  const handleFormChange = useCallback((field: keyof UpdateFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Update Employee</DialogTitle>
          <p className="text-sm text-gray-600">Update employee information for {employee?.name}</p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="update-name">Name</Label>
            <Input
              id="update-name"
              placeholder="Enter employee name"
              value={formData.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="update-email">Email</Label>
            <Input
              id="update-email"
              type="email"
              placeholder="Enter employee email"
              value={formData.email}
              onChange={(e) => handleFormChange("email", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="update-employeeId">Employee ID</Label>
            <Input
              id="update-employeeId"
              placeholder="Enter employee ID"
              value={formData.employeeId}
              onChange={(e) => handleFormChange("employeeId", e.target.value)}
              required
            />
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
              disabled={updateEmployee.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#D9AD5E] hover:bg-[#f5b641] text-white"
              disabled={updateEmployee.isPending}
            >
              {updateEmployee.isPending ? "Updating..." : "Update Employee"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
