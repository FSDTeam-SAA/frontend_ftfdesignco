import React from "react";

const SwagPacksHero = () => {
  return (
    <div
      className="relative flex items-center justify-center md:justify-center  text-start text-white h-[80vh] bg-contain bg-no-repeat bg-center"
      style={{
        background:
          "linear-gradient(270deg, rgba(0, 0, 0, 0.29) 0.57%, rgba(0, 0, 0, 0.00) 99.78%), url('/assets/swagepackshero.png') lightgray 50% / cover  no-repeat",
      }}
    >
      {/* Overlay Content */}
      <div className="relative z-10 min-w-full min-h-full flex justify-center items-center rounded-xl p-[24px] bg-[#f1eded86]">
        <div>

        <p className="font-medium font-manrope text-[20px] text-[#1059EF] leading-[120%]">
          NO-MINIMUM SWAG BOXES
        </p>
        <h3 className="text-[#131313] text-[30px] md:text-[40px] leading-[120%] font-bold font-manrope pt-1 pb-[16px]">
          Swag Boxes Simplified
        </h3>
        <p className="text-[#131313] text-[16px] font-normal font-manrope leading-[150%]">
          Streamlined, Branded Merchandise for Your Team
        </p>
        </div>
      </div>
    </div>
  );
};

export default SwagPacksHero;
