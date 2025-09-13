import Image from "next/image";
import React from "react";

const ChangingSwageGame = () => {
  return (
    <section className="">
      <div className="container mx-auto pb-[72px] pt-[48px]">
        <p className="font-manrope text-center font-medium text-[20px] leading-[120%] text-[#EFA610] pb-1">
          ONLINE COMPANY SWAG STORES
        </p>
        <h3 className="text-[30px] md:text-[40px] pb-[24px] leading-[120%] font-bold text-center text-[#131313]">
          On-demand Company Stores Are The Future
        </h3>
        <div className="flex justify-between gap-1 flex-wrap ">
          <div className="flex items-center gap-2  w-[90%] shadow-xl bg-[#FFFFFF] rounded-sm p-5  md:w-[48%] lg:w-[33%] my-5 mx-auto md:mx-0">
            <Image
              src="/assets/swage4.svg"
              alt="commpany store"
              width={66}
              height={66}
            />
            <p className="flex flex-col ">
              <span className="text-[#000000] text-[24px] font-manrope  leading-[120%]">
                Talent Acquisition
              </span>
              <span className="text-[#424242] font-manrope font-normal text-[16px] leading-[150%]">
                Sending swag to nee tolent prospects
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2  shadow-xl bg-[#FFFFFF] rounded-xl p-5  w-[90%]  md:w-[48%] lg:w-[33%] my-5 mx-auto md:mx-0">
            <Image
              src="/assets/swage5.svg"
              alt="commpany store"
              width={66}
              height={66}
            />
            <p className="flex flex-col ">
              <span className="text-[#000000] text-[24px] font-manrope  leading-[120%]">
                Marketing Swag
              </span>
              <span className="text-[#424242] font-manrope font-normal text-[16px] leading-[150%]">
                Use your online snag store
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2  w-[90%] shadow-xl bg-[#FFFFFF] rounded-xl p-5  md:w-[48%] lg:w-[33%] my-5 mx-auto md:mx-0">
            <Image
              src="/assets/swage6.svg"
              alt="commpany store"
              width={66}
              height={66}
            />
            <p className="flex flex-col ">
              <span className="text-[#000000] text-[24px] font-manrope  leading-[120%]">
                Employee Holiday Gifts
              </span>
              <span className="text-[#424242] font-manrope font-normal text-[16px] leading-[150%]">
                Let your employees pick branded or unbranded gifts
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangingSwageGame;
