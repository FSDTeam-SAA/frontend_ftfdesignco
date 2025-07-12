import { Suspense } from "react";
import { CompanyProducts } from "./_components/company-product";
import { CompanyProductFilters } from "./_components/company-product-filters";
import ShopNavbar from "@/components/shared/shopnavbar";

interface SearchParams {
  category?: string;
  page?: string;
  limit?: string;
  sort?: string;
}

export default function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <div className="">
      <div>
        <ShopNavbar />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <Suspense fallback={<div>Loading filters...</div>}>
              <CompanyProductFilters />
            </Suspense>
          </aside>
          <main className="lg:w-3/4">
            <Suspense fallback={<div>Loading products...</div>}>
              <CompanyProducts searchParams={searchParams} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}
