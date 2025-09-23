import FAQSection from "@/components/FAQSection";
import { SubScriptionPlan } from "@/components/SubScriptionPlan";
import React from "react";

function Page() {
  return (
    <div>
      <div>
        <SubScriptionPlan />
      </div>
      <div className="bg-white">
        <div className=" container text-center">
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#424242] py-[48px] leading-[120%] font-manrope">
            Trusted by Companies Nationwide
          </h2>
        </div>
      </div>
      <div className="bg-[#FCF7EF]">
        <FAQSection />
      </div>
    </div>
  );
}

export default Page;
