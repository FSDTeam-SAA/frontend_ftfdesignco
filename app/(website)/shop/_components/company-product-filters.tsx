import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface Category {
  _id: string
  title: string
}

async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
      cache: "no-store",
    })
    const data = await response.json()
    return data.success ? data.data : []
  } catch (error) {
    console.error("Failed to fetch categories:", error)
    return []
  }
}

export async function CompanyProductFilters() {
  const categories = await getCategories()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
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
          <CardTitle>Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider defaultValue={[0, 1000]} max={1000} step={10} className="w-full" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>$0</span>
              <span>$1000+</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Brands</CardTitle>
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
}
