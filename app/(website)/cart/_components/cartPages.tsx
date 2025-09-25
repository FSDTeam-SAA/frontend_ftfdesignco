"use client";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import ShopNavbar from "@/components/shared/shopnavbar";
import { employeecarddicrement, employeecardincrement } from "@/lib/api";
import { toast } from "sonner";

import { useCart } from "@/hooks/use-cart";
import { useQueryClient } from "@tanstack/react-query";

interface Product {
  _id: string;
  title: string;
  price: number;
  productImage: string;
}

interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
  totalCoin: number;
  product: Product;
  productImage?:string;
}

export default function CartPage() {
  const { removeFromCart } = useCart();
  const { data: session } = useSession();
  const token = session?.accessToken;
  const queryClient = useQueryClient();
  // ✅ Fetch cart data (directly from API)
  const { data: cartItems = [], isLoading } = useQuery<CartItem[]>({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/my-cart`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const json = await res.json();
      return json.data as CartItem[];
    },
    enabled: !!token,
  });

  // ✅ Mutations for increment/decrement
  const QuantityIncrementMutation = useMutation({
    mutationKey: ["cart"],
    mutationFn: (id: string) => employeecardincrement(id),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => toast.error(error.message),
  });

  const QuantityDecrementMutation = useMutation({
    mutationKey: ["cart"],
    mutationFn: (id: string) => employeecarddicrement(id),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => toast.error(error.message),
  });

  const handleQuantityIncrement = (id: string) => {
    QuantityIncrementMutation.mutate(id);
  };
  const handleQuantityDecrement = (id: string) => {
    QuantityDecrementMutation.mutate(id);
  };

  // ✅ Calculate total coins
  const totalCoins = cartItems.reduce(
    (total, item) => total + item.totalCoin,
    0
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ShopNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  // console.log('1234..testing',cartItems)

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Cart Page</h1>
          <p className="text-gray-600">
            From everyday essentials to the latest trends, we bring you a
            seamless shopping experience with unbeatable deals,
            delivery/discover convenience, quality, and style all in one place.
          </p>
        </div>
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link href="/shop">
              <Button className="bg-[#D9AD5E] hover:bg-[#f5b641]">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                {/* Header */}
                <div className="grid grid-cols-12 gap-4 p-4 border-b font-semibold text-sm">
                  <div className="col-span-6">Products</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Coins</div>
                  <div className="col-span-2 text-center">Remove</div>
                </div>
                {/* Cart Items */}
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="grid grid-cols-12 gap-4 p-4 items-center"
                    >
                      {/* Product Info */}
                      <div className="col-span-6 flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0">
                          <Image
                            src={
                              item.product?.productImage ||
                              "/placeholder.svg?height=64&width=64"
                            }
                            alt={item.product?.title || "Product"}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">
                            {item.product?.title}
                          </h3>
                        </div>
                      </div>
                      {/* Quantity Controls */}
                      <div className="col-span-2 flex items-center justify-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => handleQuantityDecrement(item._id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => handleQuantityIncrement(item._id)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {/* Coins */}
                      <div className="col-span-2 text-center font-medium">
                        {item.totalCoin}
                      </div>
                      {/* Remove Button */}
                      <div className="col-span-2 text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                          onClick={() => removeFromCart(item._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <Link href="/shop">
                  <Button className="bg-[#D9AD5E] hover:bg-[#f5b641]">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Card details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal (Items):</span>
                      <span>{totalCoins} Coins</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>{totalCoins} Coins</span>
                      </div>
                    </div>
                  </div>
                  <Link href="/checkout" className="block mt-6">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">
                      Checkout
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
