"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import ShopNavbar from "@/components/shared/shopnavbar";
import Link from "next/link";
import { employOrder } from "@/lib/api";
import { toast } from "sonner";

interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
  totalCoin: number;
  product: {
    _id: string;
    title: string;
    price: number;
    productImage:string;
      
  };
}

export default function CheckoutPage() {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const router = useRouter();

  const [formData, setFormData] = useState({
    country: "",
    zipCode: "",
    nameOnCard: "",
    address: "",
  });

  // Fetch cart data
  const { data: cartData, isLoading } = useQuery<CartItem[]>({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/my-cart`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      return data.data as CartItem[];
    },
    enabled: !!token,
  });

  const ordermutation = useMutation({
    mutationKey: ["order"],
    mutationFn: (data: {
      country: string;
      zipCode: string;
      name: string;
      address: string;
    }) => employOrder(data),
    onSuccess: (data) => {
      toast.success(data.message)
      router.push("/cart"); 
    },
  });

  const subtotalCoins =
    cartData?.reduce((total, item) => total + item.totalCoin, 0) || 0;
  const shippingCharge = 0;
  const totalCoins = subtotalCoins + shippingCharge;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirmation = () => {
    ordermutation.mutate({
      country: formData.country,
      zipCode: formData.zipCode,
      name: formData.nameOnCard,
      address: formData.address,
    });
  };

  if (isLoading) {
    return <p className="text-center">Loading cart...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Checkout Page</h1>
          <p className="text-gray-600 w-[85%] text-center mx-auto leading-[150%]">
            From everyday essentials to the latest trends, we bring you a
            seamless shopping experience with unbeatable deals,
            delivery/discover convenience, quality, and style all in one place.
          </p>
        </div>
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            {!cartData || cartData.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">🛒 Your cart is empty</p>
                <Link href="/shop">
                  <Button className="bg-[#D9AD5E] hover:bg-[#f5b641]">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cartData.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0">
                          <Image
                               src={
                              item.product?.productImage ||
                              "/placeholder.svg?height=64&width=64"
                            }
                            alt={item.product?.title || "Product"}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">
                            {item.product?.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Coins: {item.totalCoin}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">Quantity: {item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-4 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal (Items):</span>
                    <span>{subtotalCoins} Coins</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2">
                    <span>Total:</span>
                    <span>{totalCoins} Coins</span>
                  </div>
                </div>

                {/* Address Form */}
                <Card className="mt-6">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold mb-2">Your Address</h2>
                    <p className="text-sm text-gray-600 mb-6">
                      Choose how you would like to receive
                    </p>
                    <div className="space-y-4">
                      {/* country + zip */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            placeholder="Enter Your Country"
                            value={formData.country}
                            onChange={(e) =>
                              handleInputChange("country", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="zipCode">Zip Code</Label>
                          <Input
                            id="zipCode"
                            placeholder="0000"
                            value={formData.zipCode}
                            onChange={(e) =>
                              handleInputChange("zipCode", e.target.value)
                            }
                          />
                        </div>
                      </div>
                      {/* name */}
                      <div>
                        <Label htmlFor="nameOnCard">Name on card</Label>
                        <Input
                          id="nameOnCard"
                          placeholder="Firstname"
                          value={formData.nameOnCard}
                          onChange={(e) =>
                            handleInputChange("nameOnCard", e.target.value)
                          }
                        />
                      </div>
                      {/* address */}
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          placeholder="Enter your address"
                          value={formData.address}
                          onChange={(e) =>
                            handleInputChange("address", e.target.value)
                          }
                        />
                      </div>
                      {/* checkbox */}
                      <div className="flex items-center space-x-2 mt-4">
                        <input
                          type="checkbox"
                          id="agreeShipping"
                          className="rounded"
                        />
                        <Label htmlFor="agreeShipping" className="text-sm">
                          Agree with shipping & billing address
                        </Label>
                      </div>
                      <Button
                        disabled={ordermutation.isPending}
                        className="w-full bg-[#D9AD5E] hover:bg-[#f5b641] mt-6"
                        onClick={handleConfirmation}
                      >
                        {ordermutation.isPending
                          ? "Processing..."
                          : " Make Your Confirmation"}
                      </Button>
                      {ordermutation.isError && (
                        <p className="text-red-500">Order failed</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
