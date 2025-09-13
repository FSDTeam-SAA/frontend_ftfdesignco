import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const SwageHero3 = () => {
  return (
    <section className="bg-[#FBF7EF]">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[60px] items-center py-8 md:py-[72px] px-4 sm:px-6">
        <div>
          {/* <p className="text-[#EFA610] text-[20px] font-medium font-manrope  leading-[120%] pb-2">
            ONLINE COMPANY SWAG STORES
          </p> */}
          <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-[#424242] mb-4 md:mb-6">
            Minimum Swag Boxes
          </h2>
          {/* <p className="text-[#424242] text-[16px] leading-[120%] font-normal font-manrope  mb-4 md:mb-6">
            Our tree seog stay to your empityees and{" "}
          </p> */}
          <div className="flex gap-4 mb-4">
            <div>
              <Image
                src="/assets/check-circle-broken.png"
                alt="Check Icon"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-8 sm:h-8 md:w-12 md:h-12"
              />
            </div>
            <div>
              <p className="text-sm sm:text-base md:text-lg text-[#424242]">
                Removes the need for upfront inventory and reduces weste
              </p>
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div>
              <Image
                src="/assets/check-circle-broken.png"
                alt="Check Icon"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-8 sm:h-8 md:w-12 md:h-12"
              />
            </div>
            <div>
              <p className="text-sm sm:text-base md:text-lg text-[#424242]">
                No minimums fees and noufiant com
              </p>
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div>
              <Image
                src="/assets/check-circle-broken.png"
                alt="Check Icon"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-8 sm:h-8 md:w-12 md:h-12"
              />
            </div>
            <div>
              <p className="text-sm sm:text-base md:text-lg text-[#424242]">
                No product limits we offer top nama brands and cost effective
              </p>
            </div>
          </div>
          <div className="mt-6 md:mt-10">
            <Link href="/all-product">
              <Button className="bg-[#D9AD5E] text-[#131313] text-sm sm:text-base md:text-[18px] h-10 md:h-[48px] px-6 md:px-[42px] rounded-[8px]">
                See More
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <Image
            src="/assets/banner2.jpg"
            alt="Banner Image"
            width={1000}
            height={1000}
            className="w-full h-auto max-h-[300px] sm:max-h-[400px] md:h-[477px] rounded-[16px] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default SwageHero3;
