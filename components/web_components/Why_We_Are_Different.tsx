import Image from "next/image";

export default function Why_We_Are_Different() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-14 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold  text-[#131313] sm:text-5xl font-manrope">
              Made for Employees by Employees
            </h2>
            <p className=" text-base leading-[120%] text-center font-manrope text-[#3F3F3F] ">
              Loved by our team (and their families) but made for yours...
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <div className="grid gap-1 p-6 rounded-xl bg-[#FCF7EF] text-center">
            <div className="flex justify-center ">
              <Image
                src="/assets/defarentlogo.svg"
                alt="GratiSwag Logo"
                width={100}
                height={100}
                className="h-12 w-12 text-gray-900"
              />
            </div>
            <h2 className="text-[24px] text-[#131313] mb-3  font-bold font-manrope">
              Swag is Only One Part of Our Mission
            </h2>
            <p className="text-base font-normal font-manrope leading-[120%] text-[#424242]">
              Our focus is on overall employee engagement. We provide every
              client with feedback on a regular basis.
            </p>
          </div>
          <div className="grid gap-1 p-6 rounded-xl bg-[#FCF7EF] text-center">
            <div className="flex justify-center ">
              <Image
                src="/assets/defarentlogo.svg"
                alt="GratiSwag Logo"
                width={100}
                height={100}
                className="h-12 w-12 text-gray-900"
              />
            </div>
            <h2 className="text-[24px] text-[#131313] mb-3 font-bold font-manrope">
              Open and Honest Results
            </h2>
            <p className="text-base font-normal font-manrope leading-[120%] text-[#424242]">
              We share data with our clients that tells them what items and
              contests worked for other companies, helping drive engagement.
            </p>
          </div>
          <div className="grid gap-1 p-6 rounded-xl bg-[#FCF7EF] text-center">
            <div className="flex justify-center ">
              <Image
                src="/assets/defarentlogo.svg"
                alt="GratiSwag Logo"
                width={100}
                height={100}
                className="h-12 w-12 text-gray-900"
              />
            </div>
            <h2 className="text-[24px] text-[#131313] mb-3 font-bold font-manrope">
              Locally Personal, Nationally Trusted
            </h2>
            <p className="text-base font-normal font-manrope leading-[120%] text-[#424242]">
              You do not need to put tickets in with us for help or chat through
              an Ai bot. You will have access to ownership and GratiReps at all
              times.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
