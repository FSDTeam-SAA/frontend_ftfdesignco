"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { X, Filter } from 'lucide-react'

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

export function ProductFilters() {
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  // Load categories on component mount
  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  const toggleSidebar = () => setIsOpen(!isOpen)

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId))
    }
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand))
    }
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setPriceRange([0, 1000])
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Clear Filters Button */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg lg:hidden">Filters</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clearAllFilters}
          className="text-xs"
        >
          Clear All
        </Button>
      </div>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category._id} className="flex items-center space-x-2">
              <Checkbox 
                id={category._id} 
                checked={selectedCategories.includes(category._id)}
                onCheckedChange={(checked) => handleCategoryChange(category._id, checked as boolean)}
              />
              <Label htmlFor={category._id} className="text-sm font-normal cursor-pointer">
                {category.title}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle>Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider 
              value={priceRange} 
              onValueChange={setPriceRange} 
              max={1000} 
              step={10} 
              className="w-full" 
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}+</span>
            </div>
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
                onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
              />
              <Label htmlFor={brand} className="text-sm font-normal cursor-pointer">
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
        <Button 
          onClick={toggleSidebar} 
          variant="outline" 
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <Filter className="h-4 w-4" />
          Filters
          {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
            <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 ml-2">
              {selectedCategories.length + selectedBrands.length}
            </span>
          )}
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
              
              {/* Apply Filters Button for Mobile */}
              <div className="mt-6 pt-4 border-t">
                <Button onClick={toggleSidebar} className="w-full">
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
