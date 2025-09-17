"use client";
import type React from "react";
import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface CartItem {
  quantity: number;
  coin: number;
  productId: string;
  _id: string;
}

interface CartData {
  [productId: string]: CartItem;
}

interface CartContextType {
  cartData: CartData;
  cartCount: number;
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const queryClient = useQueryClient();

  // Fetch cart data
  const { data: cartResponse, isLoading } = useQuery({
    queryKey: ["cart", token],
    queryFn: async () => {
      if (!token) return { data: {} };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/my-cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch cart");
      return response.json();
    },
    enabled: !!token,
  });

  const cartData: CartData = cartResponse?.data || {};
  const cartCount = Object.keys(cartData).length;

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/add-to-cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId, quantity }),
        }
      );
      if (!response.ok) throw new Error("Failed to add to cart");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Product added to cart");
    },
    onError: () => {
      toast.error("Failed to add product to cart");
    },
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: async (itemId: string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to remove from cart");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Product removed from cart");
    },
    onError: () => {
      toast.error("Failed to remove product from cart");
    },
  });

  const addToCart = (productId: string, quantity: number) => {
    if (!token) {
      toast.error("User authentication required. Please log in.");
      return;
    }
    addToCartMutation.mutate({ productId, quantity });
  };

  const removeFromCart = (itemId: string) => {
    removeFromCartMutation.mutate(itemId);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      const item = cartData[productId];
      if (item) {
        removeFromCart(item._id);
      }
    } else {
      addToCart(productId, quantity);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartData,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
