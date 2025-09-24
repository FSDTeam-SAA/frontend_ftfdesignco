"use client";

import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { X, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Category {
  _id: string;
  title: string;
}

async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.success ? data.data : [];
}

interface CompanyProductFiltersProps {
  onApply: (filters: {
    categories: string[];
    // brands: string[];
    priceRange: number[];
  }) => void;
}

export function CompanyProductFilters({ onApply }: CompanyProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const toggleSidebar = () => setIsOpen(!isOpen);

  const applyFilters = () => {
    onApply({
      categories: selectedCategories,
      // brands: selectedBrands,
      priceRange,
    });
    setIsOpen(false);
  };
    const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
    // updateFilters({ prices: `${value[0]}-${value[1]}` });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <Accordion type="multiple" className="w-full space-y-6">
        {/* Categories */}
        <AccordionItem value="categories" className="border rounded-xl px-2">
          <AccordionTrigger className="font-semibold">
            Categories
          </AccordionTrigger>
          <AccordionContent className="space-y-3">
            {categories.map((cat) => (
              <div key={cat._id} className="flex items-center space-x-2">
                <Checkbox
                  id={cat._id}
                  checked={selectedCategories.includes(cat._id)}
                  onCheckedChange={(checked) =>
                    setSelectedCategories((prev) =>
                      checked
                        ? [...prev, cat._id]
                        : prev.filter((id) => id !== cat._id)
                    )
                  }
                />
                <Label htmlFor={cat._id}>{cat.title}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
         <AccordionItem value="price" className="bg-[#E9EEF2] px-2 rounded-xl">
          <AccordionTrigger>Coins</AccordionTrigger>
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
        {/* <AccordionItem
          value="price"
          className="bg-[#E9EEF2] px-4 py-2 rounded-xl"
        >
          <AccordionTrigger className="font-semibold">Coins</AccordionTrigger>
          <AccordionContent>
            <div>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
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
        </AccordionItem> */}

        {/* Brands */}
        {/* <AccordionItem value="brands" className="border rounded-xl px-2">
          <AccordionTrigger className="font-semibold">Brands</AccordionTrigger>
          <AccordionContent className="space-y-3">
            {["Nike", "Adidas", "Puma", "Champion"].map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={(checked) =>
                    setSelectedBrands((prev) =>
                      checked
                        ? [...prev, brand]
                        : prev.filter((b) => b !== brand)
                    )
                  }
                />
                <Label htmlFor={brand}>{brand}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem> */}
      </Accordion>

      {/* Apply Button */}
      <Button
        onClick={applyFilters}
        className="w-full bg-orange-500 hover:bg-orange-800 text-white"
      >
        Apply Filters
      </Button>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          onClick={toggleSidebar}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" /> Filters
        </Button>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <FilterContent />
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg overflow-y-auto p-4">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold">Filters</h2>
              <Button onClick={toggleSidebar} variant="ghost" size="sm">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}
    </>
  );
}
