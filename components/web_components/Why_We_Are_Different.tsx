import Image from "next/image"

export default function Why_We_Are_Different() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-14 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold  text-[#131313] sm:text-5xl">Why We Are Different</h2>
            <p className=" text-base text-[#3F3F3F] ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <div className="grid gap-1 p-6 rounded-xl bg-amber-50/50 text-center">
            <div className="flex justify-center mb-4">
                <Image
                src="/assets/Frame.png"
                alt="why-are-different"
                width={100}
                height={100}
                className="h-12 w-12 text-gray-900"
              />
            </div>
            <h2 className="text-[24px] text-[#131313] font-bold">Lorem ipsum dolor sit amet,</h2>
            <p className="text-base font-normal leading-[120%] text-[#424242]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            </p>
          </div>
          <div className="grid gap-1 p-6 rounded-xl bg-amber-50/50 text-center">
            <div className="flex justify-center mb-4">
           
              <Image
                src="/assets/Frame.png"
                alt="why-are-different"
                width={100}
                height={100}
                className="h-12 w-12 text-gray-900"
              />
            </div>
            <h2 className="text-[24px] text-[#131313] font-bold">Lorem ipsum dolor sit amet,</h2>
            <p className="text-base font-normal leading-[120%] text-[#424242]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            </p>
          </div>
          <div className="grid gap-1 p-6 rounded-xl bg-amber-50/50 text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/assets/Frame.png"
                alt="why-are-different"
                width={100}
                height={100}
                className="h-12 w-12 text-gray-900"
              />
            </div>
            <h2 className="text-[24px] text-[#131313] font-bold">Lorem ipsum dolor sit amet,</h2>
            <p className="text-base font-normal leading-[120%] text-[#424242]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
