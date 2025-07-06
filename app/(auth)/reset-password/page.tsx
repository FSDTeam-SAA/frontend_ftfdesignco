import React, { Suspense } from "react";
import ResetPasswordPage from "./_components/reset_password";

function page() {
  return (
    <div>
      <Suspense>
        <ResetPasswordPage />
      </Suspense>
    </div>
  );
}

export default page;
