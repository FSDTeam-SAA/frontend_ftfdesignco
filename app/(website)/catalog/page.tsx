"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface Category {
  _id: string;
  title: string;
  thumbnail: string;
}

export default function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/category`,
          {
            cache: "no-store",
          }
        );
        const data = await response.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);
  console.log("categories data", categories);

  if (loading) {
    return <div className="p-10 text-center">Loading categories...</div>;
  }

  return (
    <section className="py-16 bg-[#FCF7EF]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-[40px] font-manrope leading-[120%] text-[#131313] font-semibold">
            Products By Category
          </h2>
          <Link
            href="/products"
            className="text-[#131313] text-[20px] font-semibold leading-[120%] font-manrope border-b border-[#1059EF] pb-1 cursor-pointer"
          >
            All Products
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/all-product?category=${category.title}`}
            >
              <Card className="hover:shadow-lg bg-[#E9E9E9]  transition-shadow cursor-pointer">
                <CardContent className="p-0 pt-6 text-center">
                  <div className="relative w-full h-[150px] mx-auto mb-4">
                    <Image
                      src={category.thumbnail || "/placeholder.svg"}
                      alt={category.title}
                      fill
                      className="object-contain h-full  w-full"
                    />
                  </div>
                  <h3 className="text-lg font-semibold  bg-[#E7EEFDB8] mx-0 text-[20px] leading-[120%] font-manrope py-1 text-[#1059EF]">
                    {category.title}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
