import { Suspense } from "react";
import { CompanyProductFilters } from "./_components/company-product-filters";
import ShopNavbar from "@/components/shared/shopnavbar";
import CompanyProducts from "./_components/company-product";

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
    <div className="min-h-screen bg-gray-50">
      <div>
        <ShopNavbar />
      </div>
      <div
        className="bg-image relative"
        style={{
          backgroundImage: "url('/assets/shops.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "430px",
        }}
      >
        <div className="container mx-auto h-full flex items-end justify-center ">
          <div className="bg-white p-6 w-[350px] text-center rounded-xl shadow-lg -mb-[30px]">
            <h1 className="text-2xl font-bold text-[#EFA610]">
              For Your Company Swag Store
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-[150px]">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <Suspense
              fallback={
                <div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>
              }
            >
              <CompanyProductFilters />
            </Suspense>
          </aside>
          <main className="lg:w-3/4">
            <Suspense
              fallback={
                <div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>
              }
            >
              <CompanyProducts searchParams={searchParams} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}
