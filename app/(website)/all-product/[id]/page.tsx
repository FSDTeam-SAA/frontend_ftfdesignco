import { ProductDetail } from "./_components/product-detail"


interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail id={id} />
    </div>
  )
}
