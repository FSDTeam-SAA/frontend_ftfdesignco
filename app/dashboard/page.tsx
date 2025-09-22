// import { redirect } from "next/navigation"

// export default function HomePage() {
//   redirect("/dashboard")
// }

import React, { Suspense } from "react";
import MainDashboard from "./_components/MainDashboard";

function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainDashboard />
    </Suspense>
  );
}

export default page;
