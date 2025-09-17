"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Minus, Plus, Share } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  productImage: string;
  category: {
    _id: string;
    title: string;
  };
}

interface ProductDetailProps {
  id: string;
}

export function ProductDetail({ id }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const session = useSession();
  const token = session.data?.accessToken;

  // Fetch product details
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery<Product>({
    queryKey: ["products", id],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`)
        .then((res) => res.json())
        .then((response) => response.data),
  });

  console.log("details product", product);
  // Mutation for submitting the product
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/add-product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({
            productId: product?._id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Product already added to the shop");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Product added successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Product already added to the shop");
    },
  });

  const total = product ? product.price * quantity : 0;

  const updateQuantity = (newQuantity: number) => {
    if (product && newQuantity >= 1 && newQuantity <= product.quantity) {
      setQuantity(newQuantity);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product?.title,
          text: product?.description,
          url: window.location.href,
        })
        .catch(() => toast.error("Failed to share product"));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleSubmit = () => {
    if (!product) {
      toast.error("Product not available");
      return;
    }
    if (!token) {
      toast.error("Please log in to add the product");
      return;
    }
    mutation.mutate();
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (isError && error instanceof Error) {
    return (
      <div className="container mx-auto px-4 py-8">
        Error:{" "}
        {error.message || "Failed to load product. Please try again later."}
      </div>
    );
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:items-center lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="relative aspect-square">
            <Image
              src={product.productImage || "/placeholder.svg"}
              alt={product.title}
              width={400}
              height={400}
              className="object-cover rounded-lg w-full h-full"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-2xl font-bold text-blue-600 mb-4">
              Price: ${product.price}
            </p>
          </div>

          <div>
            <div>
              <div className="flex items-center gap-5">
                <div>
                  <Label className="text-[16px] font-medium leading-[120%] text-[#707070]">
                    QTY
                  </Label>
                  <div className="flex items-center space-x-2 p-1 mt-2 border border-[#595959] rounded">
                    <button
                      onClick={() => updateQuantity(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4 text-[#F0217A]" />
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(quantity + 1)}
                      disabled={quantity >= product.quantity}
                    >
                      <Plus className="h-4 w-4 text-[#F0217A]" />
                    </button>
                  </div>
                </div>
                <div className="text-right flex flex-col gap-2 items-start">
                  <div className="text-[16px] font-medium leading-[120%] text-[#707070]">
                    Total
                  </div>
                  <div className="text-2xl text-[#2F2F2F] leading-[120%] font-semibold ">
                    ${total}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 py-4">
              <Button
                className="bg-[#D9AD5E] hover:bg-[#f5b641] w-[172px] rounded-xl"
                onClick={handleSubmit}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Submitting..." : "Submit"}
              </Button>
              <span
                className="bg-transparent flex items-center py-2 text-sm text-black font-semibold hover:bg-gray-50"
                onClick={handleShare}
              >
                <Share className="h-4 w-4 mr-2" />
                Share
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="py-[48px]">
        <h2 className="text-2xl font-semibold text-[#212121] md:text-[40px] leading-[120%] mb-4 text-center font-manrope">
          Product Description
        </h2>
        <div className="mt-12 grid grid-cols-8 gap-12">
          <div className="col-span-6">
            <p className="text-[#4E4E4E] leading-[150%] text-[20px] font-poppins">
              {product.description}
            </p>
          </div>
          {/* <div className="col-span-2">
            <ul className="mt-4 space-y-2">
              <li>• Storage: 256GB / 512GB / 1TB</li>
              <li>• Display: 6.9-inch Super Retina XDR</li>
              <li>• Chip: A18 Pro</li>
              <li>• SKU: {product._id}</li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
}
