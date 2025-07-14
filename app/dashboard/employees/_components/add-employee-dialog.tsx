"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Upload } from "lucide-react"
import { toast } from "sonner"

interface FormData {
  name: string
  email: string
  employeeId: string
  password: string
}

interface AddEmployeeDialogProps {
  token: string
  apiBaseUrl: string
}

export function AddEmployeeDialog({ token, apiBaseUrl }: AddEmployeeDialogProps) {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    employeeId: "",
    password: "123456",
  })

  const createEmployee = useMutation({
    mutationFn: async (employeeData: FormData) => {
      const response = await fetch(`${apiBaseUrl}/employee/create-employee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employeeData),
      })
      if (!response.ok) {
        throw new Error(`Failed to create employee: ${response.statusText}`)
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] })
      toast.success("Employee created successfully")
      setIsOpen(false)
      setFormData({
        name: "",
        email: "",
        employeeId: "",
        password: "123456",
      })
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create employee")
    },
  })

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      createEmployee.mutate(formData)
    },
    [formData, createEmployee],
  )

  const handleFormChange = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#D9AD5E] hover:bg-[#f5b641] text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
          <p className="text-sm text-gray-600">Please enter details of the new employee</p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter employee name"
              value={formData.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter employee email"
              value={formData.email}
              onChange={(e) => handleFormChange("email", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="employeeId">Employee ID</Label>
            <Input
              id="employeeId"
              placeholder="Enter employee ID"
              value={formData.employeeId}
              onChange={(e) => handleFormChange("employeeId", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleFormChange("password", e.target.value)}
              placeholder="Default password is 123456"
            />
          </div>
          <div>
            <Label>Image</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">Drag and drop images here or click to upload files</p>
            </div>
          </div>
          <Button type="submit" className="w-full bg-[#D9AD5E] hover:bg-[#f5b641]" disabled={createEmployee.isPending}>
            {createEmployee.isPending ? "Creating..." : "Create Employee"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
