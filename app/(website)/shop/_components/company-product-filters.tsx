"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { X, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Category {
  _id: string;
  title: string;
}

async function getCategories(): Promise<Category[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/category`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.success ? data.data : [];
}

interface CompanyProductFiltersProps {
  onApply: (filters: {
    categories: string[];
    brands: string[];
    priceRange: number[];
  }) => void;
}

export function CompanyProductFilters({ onApply }: CompanyProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const toggleSidebar = () => setIsOpen(!isOpen);

  const applyFilters = () => {
    onApply({
      categories: selectedCategories,
      brands: selectedBrands,
      priceRange,
    });
    setIsOpen(false);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
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
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle>Coins</CardTitle>
        </CardHeader>
        <CardContent>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={1000}
            step={10}
          />
          <div className="flex justify-between text-sm text-gray-600 mt-5">
            <span>{priceRange[0]}+</span>
            <span>{priceRange[1]}+</span>
          </div>
        </CardContent>
      </Card>

      {/* Brands */}
      <Card>
        <CardHeader>
          <CardTitle>Brands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {["Nike", "Adidas", "Puma", "Champion"].map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) =>
                  setSelectedBrands((prev) =>
                    checked ? [...prev, brand] : prev.filter((b) => b !== brand)
                  )
                }
              />
              <Label htmlFor={brand}>{brand}</Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Apply Button */}
      <Button
        onClick={applyFilters}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
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
