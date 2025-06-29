"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface Category {
  _id: string
  title: string
  thumbnail: string
}

async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch("http://localhost:5001/api/v1/category", {
      cache: "no-store",
    })
    const data = await response.json()
    return data.success ? data.data : []
  } catch (error) {
    console.error("Failed to fetch categories:", error)
    return []
  }
}

export default async function CategorySection() {
  const categories = await getCategories()

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Products By Category</h2>
          <Link href="/products" className="text-blue-600 hover:underline">
            All Products
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category._id} href={`/products?category=${category._id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                      src={category.thumbnail || "/placeholder.svg"}
                      alt={category.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
