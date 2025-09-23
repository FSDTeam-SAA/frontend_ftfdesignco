"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Product } from "./products-list"

interface EditCoinModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onUpdateCoin: (productId: string, coin: number) => void
  isUpdating: boolean
}

export function EditCoinModal({ product, isOpen, onClose, onUpdateCoin, isUpdating }: EditCoinModalProps) {
  const [coinValue, setCoinValue] = useState(product?.coin || 0)

  // Update coin value when product changes
  useEffect(() => {
    if (product) {
      setCoinValue(product.coin)
    }
  }, [product])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!product) return

    onUpdateCoin(product._id, coinValue)
    onClose()
  }

  const handleClose = () => {
    setCoinValue(product?.coin || 0)
    onClose()
  }

  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit Coin Value</DialogTitle>
          <DialogDescription>
            Update the coin value for <strong>{product.product.title}</strong>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="coin" className="text-right">
                Coin Value
              </Label>
              <Input
                id="coin"
                type="text"
                value={coinValue}
                onChange={(e) => setCoinValue(Number(e.target.value))}
                className="col-span-3"
                min="0"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-sm text-gray-500">Current:</Label>
              <span className="col-span-3 text-sm text-gray-600">{product.coin} coins</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-sm text-gray-500">Price:</Label>
              <span className="col-span-3 text-sm text-gray-600">${product.product.price}</span>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} className="border-[#EFA610] text-[#EFA610] hover:text-[#EFA610]/90">
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdating} className="bg-[#EFA610] text-white rounded-[8px] hover:bg-[#EFA610]/90 hover:text-white">
              {isUpdating ? "Updating..." : "Update Coin"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
