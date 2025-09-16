import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

const SwagPacksHero1 = () => {
  return (
    <section className="bg-[#FBF7EF]">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[60px] items-center py-8 md:py-[72px] px-4 sm:px-6">
        <div>
          <Image
            src="/assets/swagepackshero1.png"
            alt="Banner Image"
            width={1000}
            height={1000}
            className="w-full h-auto max-h-[477px] sm:max-h-[400px] md:h-[477px] rounded-[16px] object-cover"
          />
        </div>
        <div>
          <p className="text-[#EFA610] text-[20px] font-medium font-manrope  leading-[120%] pb-2">
            ONLINE COMPANY SWAG STORES
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-[#424242] pb-2">
            Sit Back & Relax While Your Store Does The Work
          </h2>
          <p className="text-[#424242] text-[16px] leading-[120%] font-normal font-manrope  mb-4 md:mb-6">
            Our tree seog stay to your empityees and{" "}
          </p>
          <div className="flex items-center gap-4 mb-4">
            <div>
              <Image
                src="/assets/check-circle-broken.png"
                alt="Check Icon"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-8 sm:h-8 md:max-w-12 md:max-h-12"
              />
            </div>
            <div>
              <p className="text-sm sm:text-base md:text-lg text-[#424242]">
                We take care of the entire process from design to delivery, so
                you don&apos;t have to worry about a thing
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center mb-4">
            <div>
              <Image
                src="/assets/check-circle-broken.png"
                alt="Check Icon"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-8 sm:h-8 md:max-w-12 md:max-h-12"
              />
            </div>
            <div>
              <p className="text-sm sm:text-base md:text-lg text-[#424242]">
                Detailed tracking and reporting on orders available, so you can
                easily keep track of your swag
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
                className="w-8 h-8 sm:w-8 sm:h-8 md:max-w-12 md:max-h-12"
              />
            </div>
            <div>
              <p className="text-sm sm:text-base md:text-lg text-[#424242]">
                Easily setup coupon codes for employees or clients to redeem. No
                more figuring out everyone&apos;s sizes!
              </p>
            </div>
          </div>
          <div className="mt-6 md:mt-10">
            <Link href="#swagecreatestore">
              <Button className="bg-[#EFA610] text-[#131313] text-sm sm:text-base md:text-[18px] h-10 md:h-[48px] px-6 md:px-[42px] rounded-[8px]">
                Create My Store
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SwagPacksHero1;
