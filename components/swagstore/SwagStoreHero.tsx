import React from "react";

const SwagStoreHero = () => {
  return (
    <div
      className="relative flex items-center justify-center md:justify-start md:pl-10 text-start text-white h-[80vh] bg-cover bg-no-repeat bg-center"
      style={{
        background:
          "linear-gradient(270deg, rgba(0, 0, 0, 0.29) 0.57%, rgba(0, 0, 0, 0.00) 99.78%), url('/assets/swagstore.jpg') lightgray 50% / cover no-repeat",
      }}
    >
      {/* Overlay Content */}
      <div className="relative z-10 max-w-[445px] max-h-[212px] rounded-xl p-[24px] bg-[#FFFFFF52]">
        <p className="font-medium font-manrope text-[20px] text-[#1059EF] leading-[120%]">
          ON DEMAND SWAG STORES
        </p>
        <h3 className="text-[#131313] text-[30px] md:text-[40px] leading-[120%] font-bold font-manrope pt-1 pb-[16px]">
          Enhanced Employee Swag Shops
        </h3>
        <p className="text-[#131313] text-[16px] font-normal font-manrope leading-[150%]">
          Streamlined, Branded Merchandise for Your Team
        </p>
      </div>
    </div>
  );
};

export default SwagStoreHero;
