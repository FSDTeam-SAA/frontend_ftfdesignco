
import { Suspense } from "react"
import { ProductFilters } from "./_components/product-filters"
import { ProductsGrid } from "./_components/products-grid"

interface SearchParams {
  category?: string
  page?: string
  limit?: string
  sort?: string
}

export default function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4">
          <Suspense fallback={<div>Loading filters...</div>}>
            <ProductFilters />
          </Suspense>
        </aside>
        <main className="lg:w-3/4">
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductsGrid searchParams={searchParams} />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
