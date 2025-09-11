import { Suspense } from "react"
import { ProductFilters } from "./_components/product-filters"
import { GetProductsParams, ProductsGrid } from "./_components/products-grid"


export default function ProductsPage({ searchParams }: { searchParams: GetProductsParams }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4">
            <Suspense
              fallback={<div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>}
            >
              <ProductFilters  />
            </Suspense>
          </aside>

          {/* Products */}
          <main className="lg:w-3/4">
            <Suspense
              fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-gray-200 h-80 rounded-lg"></div>
                  ))}
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
