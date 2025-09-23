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
        <div className="flex justify-between gap-3  flex-wrap ">
          <div
            className="flex items-center gap-2  w-[90%] shadow-[50px_27px_100px_50px_rgba(0,_0,_0,_0.1)] bg-[#FFFFFF] rounded-xl p-5  md:w-[48%] lg:w-[32%] my-5 mx-auto md:mx-0"
          >
            <Image
              src="/assets/swage7.svg"
              alt="commpany store"
              width={66}
              height={66}
            />
            <p className="flex flex-col ">
              <span className="text-[#000000] text-[24px] font-manrope  leading-[120%]">
                No Inventory Necessary
              </span>
              <span className="text-[#424242] font-manrope font-normal text-[16px] leading-[150%]">
                Crerpurchasing sweg is problem is need to wong with demand
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2  shadow-[50px_27px_100px_50px_rgba(0,_0,_0,_0.1)] bg-[#FFFFFF] rounded-xl p-5  w-[90%]  md:w-[48%] lg:w-[32%] my-5 mx-auto md:mx-0">
            <Image
              src="/assets/swage8.svg"
              alt="commpany store"
              width={66}
              height={66}
            />
            <p className="flex flex-col ">
              <span className="text-[#000000] text-[24px] font-manrope  leading-[120%]">
Maintain Brand Standards              </span>
              <span className="text-[#424242] font-manrope font-normal text-[16px] leading-[150%]">
                Tour online swag core ans et a brand washing Orly proved aeg be
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2  w-[90%] shadow-[50px_27px_100px_50px_rgba(0,_0,_0,_0.1)] bg-[#FFFFFF] rounded-xl p-5  md:w-[48%] lg:w-[32%] my-5 mx-auto md:mx-0">
            <Image
              src="/assets/swage9.svg"
              alt="commpany store"
              width={66}
              height={66}
            />
            <p className="flex flex-col ">
              <span className="text-[#000000] text-[24px] font-manrope  leading-[120%]">
                Sustainable Swag
              </span>
              <span className="text-[#424242] font-manrope font-normal text-[16px] leading-[150%]">
               On-demand sing mones provide a more pucaineble prяз коровст
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangingSwageGame;
