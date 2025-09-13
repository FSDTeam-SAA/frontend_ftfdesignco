import Image from "next/image";
import React from "react";

const SwageDemanBrand = () => {
  return (
    <section>
      <div className="container mx-auto py-[60px] md:py-[72px]">
        <h2 className="text-[#424242] font-bold text-[30px] md:text-[40px] leading-[120%] text-center font-manrope mb-[40px]">
          Top Demand Brands{" "}
        </h2>
        <div className="flex justify-between flex-wrap items-center ">
          <Image
            className="mx-auto"
            src="/assets/brand.svg"
            alt="brand"
            width={276}
            height={155}
          />
          <Image
            className="mx-auto"
            src="/assets/brand1.svg"
            alt="brand"
            width={276}
            height={155}
          />
          <Image
            className="mx-auto"
            src="/assets/brand2.svg"
            alt="brand"
            width={276}
            height={155}
          />
          <Image
            className="mx-auto"
            src="/assets/brand3.svg"
            alt="brand"
            width={276}
            height={155}
          />
        </div>
      </div>
    </section>
  );
};

export default SwageDemanBrand;
