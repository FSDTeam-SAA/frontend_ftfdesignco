"use client";

import { useRouter, useSearchParams } from "next/navigation";

const sortOptions = [
  { value: "recent", label: "Recent" }, // newest products first
  { value: "asc", label: "Price: Low to High" },
];

export function SortBy() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "recent";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    router.push(`/all-product?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700">
        Sort By:
      </label>
      <select
        id="sort"
        value={currentSort}
        onChange={handleChange}
        className="border rounded-lg px-3 py-2 text-sm"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
