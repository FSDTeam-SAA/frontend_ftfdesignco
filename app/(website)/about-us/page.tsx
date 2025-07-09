import Image from "next/image";

export default function Page() {
  return (
    <section>
      <div className="container text-center py-12 sm:py-16 md:py-20 lg:py-24 space-y-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-[#131313] font-bold">
          About Us
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-[#424242] font-normal max-w-3xl mx-auto">
          We are a leading swag platform that helps businesses create memorable
          brand experiences through high-quality promotional products. Our
          mission is to make corporate gifting simple, efficient, and impactful.
        </p>
      </div>
      <div className="container pb-12 sm:pb-16 md:pb-20 lg:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] text-[#131313] font-bold mb-4 sm:mb-6">
                About Your Website
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#545454] font-normal leading-[120%] mb-4 sm:mb-6">
                We are a leading swag platform that helps businesses create
                memorable brand experiences through high-quality promotional
                products. Our mission is to make corporate gifting simple,
                efficient, and impactful.
              </p>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] text-[#131313] font-bold mb-4 sm:mb-6">
                Our Mission
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#545454] font-normal leading-[120%] mb-4 sm:mb-6">
                We are a leading swag platform that helps businesses create
                memorable brand experiences through high-quality promotional
                products. Our mission is to make corporate gifting simple,
                efficient, and impactful.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-[#131313]">
                  30K+
                </div>
                <div className="text-sm sm:text-base md:text-lg lg:text-xl text-[#131313]">
                  Our Users
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-[#131313]">
                  12K+
                </div>
                <div className="text-sm sm:text-base md:text-lg lg:text-xl text-[#131313]">
                  Satisfied Brands
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-[#131313]">
                  2K+
                </div>
                <div className="text-sm sm:text-base md:text-lg lg:text-xl text-[#131313]">
                  Company List
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/assets/about.png"
              alt="About Us"
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>
        <div className="space-y-6 sm:space-y-8 mt-8 sm:mt-10 md:mt-12">
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-semibold text-[#131313]">
              What We Offer
            </h2>
            <div className="space-y-4">
              <p className="text-sm sm:text-base md:text-lg text-[#545454] font-normal leading-[120%]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                eget euismod velit. Ut dapibus est urna. Suspendisse dictum
                facilisis ullamcorper.
              </p>
              <div>
                <ul className="list-disc text-sm sm:text-base md:text-lg text-[#545454] font-normal leading-[120%] space-y-2 pl-5">
                  <li>
                    <span className="font-bold text-[#545454]">Lorem ipsum</span> Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed eget
                    euismod velit. Ut dapibus est urna. Suspendisse dictum
                    facilisis ullamcorper. Maecenas vitae efficitur tortor, in
                    placerat dui.
                  </li>
                  <li>
                    <span className="font-bold text-[#545454]">Lorem ipsum</span> Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed eget
                    euismod velit. Ut dapibus est urna. Suspendisse dictum
                    facilisis ullamcorper. Maecenas vitae efficitur tortor, in
                    placerat dui.
                  </li>
                  <li>
                    <span className="font-bold text-[#545454]">Lorem ipsum</span> Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed eget
                    euismod velit. Ut dapibus est urna. Suspendisse dictum
                    facilisis ullamcorper. Maecenas vitae efficitur tortor, in
                    placerat dui.
                  </li>
                  <li>
                    <span className="font-bold text-[#545454]">Lorem ipsum</span> Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed eget
                    euismod velit. Ut dapibus est urna. Suspendisse dictum
                    facilisis ullamcorper. Maecenas vitae efficitur tortor, in
                    placerat dui.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-semibold text-[#131313]">
              Unique Business Content
            </h2>
            <div className="space-y-4">
              <p className="text-sm sm:text-base md:text-lg text-[#545454] font-normal leading-[120%]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                eget euismod velit. Ut dapibus est urna. Suspendisse dictum
                facilisis ullamcorper.
              </p>
              <div>
                <ul className="list-disc text-sm sm:text-base md:text-lg text-[#545454] font-normal leading-[120%] space-y-2 pl-5">
                  <li>
                    <span className="font-bold text-[#545454]">Lorem ipsum</span> Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed eget
                    euismod velit. Ut dapibus est urna. Suspendisse dictum
                    facilisis ullamcorper. Maecenas vitae efficitur tortor, in
                    placerat dui.
                  </li>
                  <li>
                    <span className="font-bold text-[#545454]">Lorem ipsum</span> Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed eget
                    euismod velit. Ut dapibus est urna. Suspendisse dictum
                    facilisis ullamcorper. Maecenas vitae efficitur tortor, in
                    placerat dui.
                  </li>
                  <li>
                    <span className="font-bold text-[#545454]">Lorem ipsum</span> Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed eget
                    euismod velit. Ut dapibus est urna. Suspendisse dictum
                    facilisis ullamcorper. Maecenas vitae efficitur tortor, in
                    placerat dui.
                  </li>
                  <li>
                    <span className="font-bold text-[#545454]">Lorem ipsum</span> Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed eget
                    euismod velit. Ut dapibus est urna. Suspendisse dictum
                    facilisis ullamcorper. Maecenas vitae efficitur tortor, in
                    placerat dui.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-semibold text-[#131313]">
              Our Commitment
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#545454] font-normal leading-[120%]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
              euismod velit. Ut dapibus est urna. Suspendisse dictum facilisis
              ullamcorper.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-semibold text-[#131313]">
              Join Us
            </h2>
            <div className="space-y-2">
              <p className="text-sm sm:text-base md:text-lg text-[#545454] font-normal leading-[120%]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                eget euismod velit. Ut dapibus est urna. Suspendisse dictum
                facilisis ullamcorper.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-[#545454] font-normal leading-[120%]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                eget euismod velit. Ut dapibus est urna. Suspendisse dictum
                facilisis ullamcorper.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}