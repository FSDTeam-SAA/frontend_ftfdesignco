import Image from "next/image";
import React from "react";

const PricingHero = () => {
  return (
    <section className="bg-[#FCF7EF]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-10">
          <div>
            <p className="text-[#EFA610] mb-[4px] font-[20px]">Company</p>
            <h2 className="text-[40px] mb-[16px] md:text-[50px] font-manrope font-semibold ">
              For A Best Company <span className="text-[#1059EF]">Swag</span>{" "}
              Store
            </h2>
            <p className="font-manrope text-[16px] leading-[150%] font-normal">
              The Swag Store isn`&apost;`t just about clothes or
              accessories—it’s about expressing who you are.{" "}
            </p>
          </div>
          <div className="w-full aspect-auto">
            <Image
              className="w-full h-full bg-cover"
              src={"/assets/priceinghero.png"}
              alt="pricing hero"
              width={476}
              height={460}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingHero;
