"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { X, Filter } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

interface Category {
  _id: string
  title: string
}

async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/category`, {
      cache: "no-store",
    })
    const data = await response.json()
    return data.success ? data.data : []
  } catch (error) {
    console.error("Failed to fetch categories:", error)
    return []
  }
}

export function CompanyProductFilters() {
  const [isOpen, setIsOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1000])

  // Use useQuery to fetch categories
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  })

  const toggleSidebar = () => setIsOpen(!isOpen)

  const FilterContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categoriesLoading && <div className="text-gray-500">Loading categories...</div>}
          {categoriesError && <div className="text-red-500">Failed to load categories.</div>}
          {categories?.map((category) => (
            <div key={category._id} className="flex items-center space-x-2">
              <Checkbox id={category._id} />
              <Label htmlFor={category._id} className="text-sm font-normal">
                {category.title}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Coins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider value={priceRange} onValueChange={setPriceRange} max={1000} step={10} className="w-full" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{priceRange[0]} Coins</span>
              <span>{priceRange[1]}+ Coins</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Brands</CardTitle> {/* Changed "Size" to "Brands" */}
        </CardHeader>
        <CardContent className="space-y-3">
          {["Nike", "Adidas", "Puma", "Champion"].map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox id={brand} />
              <Label htmlFor={brand} className="text-sm font-normal">
                {brand}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button onClick={toggleSidebar} variant="outline" className="flex items-center gap-2 bg-transparent">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <FilterContent />
      </div>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button onClick={toggleSidebar} variant="ghost" size="sm" className="p-1">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <FilterContent />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
