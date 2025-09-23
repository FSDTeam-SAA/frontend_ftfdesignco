import Image from "next/image";
import React from "react";

const SwageGame = () => {
  return (
    <section>
      <div className="container mx-auto pb-[72px] pt-[48px]">
        <p className="font-manrope text-center font-medium text-[20px] leading-[120%] text-[#EFA610] pb-1">
          ONLINE COMPANY SWAG STORES
        </p>
        <h3 className="text-[30px] md:text-[40px] pb-[24px] leading-[120%] font-bold text-center text-[#131313]">
          Changing The Swag Game
        </h3>
        <div className="flex justify-between flex-wrap ">
          <div className="flex flex-col text-center items-center gap-2 w-[90%]  md:w-[48%] lg:w-[33%] my-5 mx-auto md:mx-0">
            <Image
              src="/assets/swagegame1.png"
              alt="commpany store"
              width={374}
              height={269}
            />
            <p className="flex flex-col pt-[16px]">
              <span className="text-[#000000] text-[24px] font-manrope  leading-[120%] pb-2">
                KCAS Bio
              </span>
              <span className="text-[#424242] font-manrope font-normal text-[16px] leading-[150%]">
                Dreamined anag purchasing for a global bisanalytics partner
              </span>
            </p>
          </div>
          <div className="flex flex-col text-center items-center gap-2 w-[90%]  md:w-[48%] lg:w-[33%] my-5 mx-auto md:mx-0">
            <Image
              src="/assets/swagegame2.png"
              alt="commpany store"
              width={374}
              height={269}
            />
            <p className="flex flex-col pt-[16px]">
              <span className="text-[#000000] text-[24px] font-manrope  leading-[120%] pb-2">
                Provenance.io
              </span>
              <span className="text-[#424242] font-manrope font-normal text-[16px] leading-[150%]">
                Helping gat employees and at a time
              </span>
            </p>
          </div>
          <div className="flex flex-col text-center items-center gap-2    w-[90%]  md:w-[48%] lg:w-[33%] my-5 mx-auto md:mx-0">
            <Image
              src="/assets/swagegame3.png"
              alt="commpany store"
              width={374}
              height={269}
            />
            <p className="flex flex-col pt-[16px]">
              <span className="text-[#000000] text-[24px] font-manrope  leading-[120%] pb-2">
                Vesta Coffee Roasters
              </span>
              <span className="text-[#424242] font-manrope font-normal text-[16px] leading-[150%]">
                Vesta`&apos;`s stare freed up crucial capital by using on demand
                apparel for amplayes gear
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SwageGame;
