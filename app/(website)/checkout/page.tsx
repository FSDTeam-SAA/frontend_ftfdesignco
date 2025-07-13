"use client"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2 } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import ShopNavbar from "@/components/shared/shopnavbar"

interface Product {
  _id: string
  title: string
  price: number
}

export default function CheckoutPage() {
  const { cartData, removeFromCart } = useCart()
  const { data: session } = useSession()
  const token = session?.accessToken

  const [formData, setFormData] = useState({
    country: "",
    zipCode: "",
    nameOnCard: "",
    address: "",
  })

  // Fetch product details for cart items
  const { data: productsData } = useQuery({
    queryKey: ["cartProducts", Object.keys(cartData)],
    queryFn: async () => {
      const productIds = Object.keys(cartData)
      if (productIds.length === 0) return []
      const productPromises = productIds.map(async (productId) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.ok) {
          const data = await response.json()
          return data.data
        }
        return null
      })
      const products = await Promise.all(productPromises)
      return products.filter(Boolean)
    },
    enabled: !!token && Object.keys(cartData).length > 0,
  })

  const cartItems = Object.entries(cartData).map(([productId, cartItem]) => {
    const product = productsData?.find((p: Product) => p._id === productId)
    return {
      ...cartItem,
      product,
    }
  })

  const subtotalCoins = cartItems.reduce((total, item) => {
    return total + item.coin * item.quantity
  }, 0)
  const shippingCharge = 0
  const totalCoins = subtotalCoins + shippingCharge

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleConfirmation = () => {
    // Handle order confirmation logic here
    console.log("Order confirmed with data:", formData)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Checkout Page</h1>
          <p className="text-gray-600">
            From everyday essentials to the latest trends, we bring you a seamless shopping experience with unbeatable
            deals, delivery/discover convenience, quality, and style all in one place.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0">
                        <Image
                          src="/placeholder.svg?height=48&width=48"
                          alt={item.product?.title || "Product"}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{item.product?.title || "Loading..."}</h3>
                        <p className="text-sm text-gray-500">Coins: {item.coin}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Qty: {item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-500 hover:text-red-700"
                        onClick={() => removeFromCart(item._id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal (Items):</span>
                  <span>{subtotalCoins} Coins</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping Charge:</span>
                  <span>{shippingCharge} Coins</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Total:</span>
                  <span>{totalCoins} Coins</span>
                </div>
              </div>
            </div>
          </div>
          {/* Address Form */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-2">Your Address</h2>
                <p className="text-sm text-gray-600 mb-6">Choose how you would like to receive</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select onValueChange={(value) => handleInputChange("country", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="United States, Canada" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input
                        id="zipCode"
                        placeholder="0000"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="nameOnCard">Name on card</Label>
                    <Input
                      id="nameOnCard"
                      placeholder="Firstname"
                      value={formData.nameOnCard}
                      onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="Enter your address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                    <input type="checkbox" id="agreeShipping" className="rounded" />
                    <Label htmlFor="agreeShipping" className="text-sm">
                      Agree with shipping & billing address
                    </Label>
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 mt-6" onClick={handleConfirmation}>
                    💰 Make Your Confirmation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
