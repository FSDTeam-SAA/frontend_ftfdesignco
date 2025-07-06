import React, { Suspense } from "react";
import OtpPage from "./_components/submitting-opt";

function page() {
  return (
    <div>
      <Suspense>
        <OtpPage />
      </Suspense>
    </div>
  );
}

export default page;
