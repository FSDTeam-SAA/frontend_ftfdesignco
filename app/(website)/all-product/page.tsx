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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <Suspense
              fallback={
                <div className="space-y-4">
                  <div className="animate-pulse bg-gray-200 h-10 rounded-lg lg:hidden"></div>
                  <div className="hidden lg:block animate-pulse bg-gray-200 h-96 rounded-lg"></div>
                </div>
              }
            >
              <ProductFilters />
            </Suspense>
          </aside>
          <main className="lg:w-3/4">
            <Suspense
              fallback={
                <div className="space-y-6">
                  <div className="animate-pulse bg-gray-200 h-8 rounded-lg"></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="animate-pulse bg-gray-200 h-80 rounded-lg"></div>
                    ))}
                  </div>
                </div>
              }
            >
              <ProductsGrid searchParams={searchParams} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}
