"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Minus, Plus, Share } from "lucide-react"
import Image from "next/image"

interface Product {
  _id: string
  title: string
  description: string
  price: number
  quantity: number
  productImage: string
  category: {
    _id: string
    title: string
  }
}

export function ProductDetail({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [total, setTotal] = useState(product.price)

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.quantity) {
      setQuantity(newQuantity)
      setTotal(product.price * newQuantity)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="relative aspect-square">
            <Image
              src={product.productImage || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-2xl font-bold text-blue-600 mb-4">Price: ${product.price}</p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <Label htmlFor="size">Size</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xs">XS</SelectItem>
                    <SelectItem value="s">S</SelectItem>
                    <SelectItem value="m">M</SelectItem>
                    <SelectItem value="l">L</SelectItem>
                    <SelectItem value="xl">XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>QTY</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(quantity + 1)}
                    disabled={quantity >= product.quantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-600">Total</div>
                <div className="text-2xl font-bold">${total.toFixed(2)}</div>
              </div>

              <div className="space-y-2">
                <Button className="w-full" size="lg">
                  Submit
                </Button>
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Product Description</h2>
        <div className="prose max-w-none">
          <p>{product.description}</p>
          <ul className="mt-4 space-y-2">
            <li>• Color: Available in multiple colors</li>
            <li>• Season: All Year Round</li>
            <li>• Range: Premium Collection</li>
            <li>• SKU: {product._id}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
