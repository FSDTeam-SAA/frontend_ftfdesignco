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
  coin: number
}

interface AddCoinsDialogProps {
  isOpen: boolean
  onClose: () => void
  employee: Employee | null
  token: string
  apiBaseUrl: string
}

export function AddCoinsDialog({ isOpen, onClose, employee, token, apiBaseUrl }: AddCoinsDialogProps) {
  const queryClient = useQueryClient()
  const [coinAmount, setCoinAmount] = useState("")

  // Reset coin amount when dialog opens
  useEffect(() => {
    if (isOpen && employee) {
      setCoinAmount(employee.coin.toString())
    }
  }, [isOpen, employee])

  const updateCoin = useMutation({
    mutationFn: async (coin: number) => {
      if (!employee) throw new Error("No employee selected")

      const response = await fetch(`${apiBaseUrl}/employee/${employee._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ coin }),
      })
      if (!response.ok) {
        throw new Error(`Failed to update coin: ${response.statusText}`)
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] })
      toast.success("Coins updated successfully")
      onClose()
      setCoinAmount("")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update coins")
    },
  })

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const coinValue = Number(coinAmount)
      if (isNaN(coinValue) || coinValue < 0) {
        toast.error("Please enter a valid number for coins")
        return
      }
      updateCoin.mutate(coinValue)
    },
    [coinAmount, updateCoin],
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Add/Update Coins</DialogTitle>
          <p className="text-sm text-gray-600">Update coin balance for {employee?.name}</p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="coin-amount">Current Coins: {employee?.coin || 0}</Label>
            <Input
              id="coin-amount"
              type="number"
              placeholder="Enter new coin amount"
              value={coinAmount}
              onChange={(e) => setCoinAmount(e.target.value)}
              required
              min="0"
            />
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
              disabled={updateCoin.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#D9AD5E] hover:bg-[#f5b641] text-white"
              disabled={updateCoin.isPending}
            >
              {updateCoin.isPending ? "Updating..." : "Update Coins"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
