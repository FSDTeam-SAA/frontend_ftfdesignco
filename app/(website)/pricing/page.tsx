import FAQSection from "@/components/FAQSection";
import { SubScriptionPlan } from "@/components/SubScriptionPlan";
import React from "react";

function Page() {
  return (
    <div>
      <div>
        <SubScriptionPlan />
      </div>

      <div className="bg-[#FCF7EF]">
        <FAQSection />
      </div>
    </div>
  );
}

export default Page;
