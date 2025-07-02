
import { notFound } from "next/navigation"
import { ProductDetail } from "./_components/product-detail"

interface Product {
  _id: string
  title: string
  description: string
  price: number
  quantity: number
  productImage: string
  category: {
    _id: string
    title: string
  }
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`http://localhost:5001/api/v1/product/${id}`, {
      cache: "no-store",
    })
    const data = await response.json()
    return data.success ? data.data : null
  } catch (error) {
    console.error("Failed to fetch product:", error)
    return null
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}
