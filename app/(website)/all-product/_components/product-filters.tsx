"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
interface Category {
  _id: string;
  title: string;
}

// fetch all categories
async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    // console.error(err);
    toast.error(`${err}`)
    return [];
  }
}

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  // Load categories
  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  // Initialize from URL params
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    // const brandParam = searchParams.get("brand");
    const pricesParam = searchParams.get("prices");

    if (categoryParam) setSelectedCategories(categoryParam.split(","));
    // if (brandParam) setSelectedBrands(brandParam.split(","));
    if (pricesParam) {
      const [min, max] = pricesParam.split("-").map(Number);
      setPriceRange([min, max]);
    }
  }, [searchParams]);

  const updateFilters = (newFilters: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newFilters).forEach(([key, value]) => {
      if (!value) params.delete(key);
      else params.set(key, value);
    });
    router.push(`/all-product?${params.toString()}`);
  };

  const handleCategoryChange = (title: string, checked: boolean) => {
    const updated = checked
      ? [...selectedCategories, title]
      : selectedCategories.filter((t) => t !== title);
    setSelectedCategories(updated);
    updateFilters({ category: updated.join(",") });
  };

  // const handleBrandChange = (brand: string, checked: boolean) => {
  //   const updated = checked
  //     ? [...selectedBrands, brand]
  //     : selectedBrands.filter((b) => b !== brand);
  //   setSelectedBrands(updated);
  //   updateFilters({ brand: updated.join(",") });
  // };

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
    updateFilters({ prices: `${value[0]}-${value[1]}` });
  };

  const clearAll = () => {
    setSelectedCategories([]);
    // setSelectedBrands([]);
    setPriceRange([0, 1000]);
    router.push("/all-product");
  };

  return (
    <div className="pt-12">
      <Accordion type="multiple" className="w-full space-y-5">
        {/* Categories */}
        <AccordionItem
          value="categories"
          className="bg-[#E9EEF2] px-2 rounded-xl"
        >
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent className="space-y-2">
            {categories.map((c) => (
              <div key={c._id} className="flex items-center space-x-2">
                <Checkbox
                  id={c._id}
                  checked={selectedCategories.includes(c.title)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(c.title, checked as boolean)
                  }
                />
                <Label htmlFor={c._id}>{c.title}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Price */}
        <AccordionItem value="price" className="bg-[#E9EEF2] px-2 rounded-xl">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="">
              <Slider
                value={priceRange}
                onValueChange={handlePriceChange}
                max={1000}
                step={10}
                className="w-full bg-gray-300 rounded-full my-4"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}+</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Brands */}
        {/* <AccordionItem value="brands" className="bg-[#E9EEF2] px-2 rounded-xl">
          <AccordionTrigger>Brands</AccordionTrigger>
          <AccordionContent className="space-y-2">
            {["Nike", "Adidas", "Puma", "Champion"].map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={(checked) =>
                    handleBrandChange(brand, checked as boolean)
                  }
                />
                <Label htmlFor={brand}>{brand}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem> */}
      </Accordion>

      <Button
        onClick={clearAll}
        variant="outline"
        size="sm"
        className="mt-5 rounded-xl bg-[#E0B15E] border-none px-8 hover:bg-[#EFA610] hover:text-white"
      >
        Clear All
      </Button>
    </div>
  );
}
