import { ShopProductDetail } from "./_components/shop-product-details"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params
  return (
    <div className="container mx-auto px-4 py-8">
      <ShopProductDetail id={id} />
    </div>
  )
}
