"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { CreateStoreModal } from "./create-store-modal";
import Link from "next/link";

export function Banner() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const token = session?.accessToken;
  const accessSubScription = session?.user?.isPaid === true;

  const handleClick = () => {
    if (!token) {
      router.push("/login");
    } else if (!accessSubScription) {
      router.push("/pricing");
    } else {
      setIsModalOpen(true); // Open the modal instead of navigating
    }
  };

  return (
    <section className="bg-white py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="container mx-auto grid items-center gap-6 px-4 sm:gap-8 md:grid-cols-2 md:px-6 lg:gap-12 xl:gap-1">
        {/* Left Content */}
        <div className="flex flex-col items-start order-2 md:order-1">
          {/* <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-gratisswag-orange sm:text-sm">
            Company
          </span> */}
          <h2 className="mb-4 text-2xl font-bold leading-tight font-manrope text-gratisswag-dark-gray sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl max-w-[90vw] sm:max-w-[513px]">
            Gratitude Given.{" "}
            <span className="text-gratisswag-accent-blue">Engagement</span>{" "}
            Gained.
          </h2>
          <p className="mb-6 text-base text-gray-600 sm:text-lg md:text-xl max-w-[90vw] sm:max-w-[513px]">
            Fuel employee excitement with a swag store platform that celebrates
            and rewards every win.
          </p>
          <div className="flex flex-col mx-auto lg:mx-0 gap-3 sm:flex-row sm:gap-4">
            {/* Create My Store Button - Now opens a modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button
                  className="py-2 px-6 rounded leading-[120%] font-manrope bg-[#D9AD5E] text-base font-semibold text-white hover:bg-[#f5b641] hover:text-white sm:text-lg"
                  onClick={handleClick}
                >
                  Create My Store
                </Button>
              </DialogTrigger>
              <CreateStoreModal />
            </Dialog>
            <Link href="/all-product">
              <Button className="py-2 px-12 rounded leading-[120%]  bg-[#131313] text-base font-semibold text-white hover:bg-[#f5b641] font-manrope hover:text-white sm:text-lg">
                See More
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end order-1 md:order-2">
          <Image
            src="/assets/banner.png"
            alt="GratiSwag branded merchandise"
            width={600}
            height={600}
            className="h-auto w-full max-w-[90vw] rounded-xl object-cover shadow-lg sm:max-w-md md:max-w-lg lg:max-w-xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
