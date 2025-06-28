import Image from "next/image"

import { Button } from "@/components/ui/button"

export function Banner() {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container mx-auto grid items-center gap-8 px-4 md:grid-cols-2 md:px-6 lg:gap-12">
        {/* Left Content */}
        <div className="flex flex-col items-start">
          <span className="mb-2 text-sm font-semibold uppercase text-gratisswag-orange">Company</span>
          <h1 className="mb-4 text-4xl font-bold leading-tight text-gratisswag-dark-gray md:text-5xl lg:text-6xl">
            Gratitude Given. <span className="text-gratisswag-accent-blue">Engagement</span> Gained.
          </h1>
          <p className="mb-8 text-lg text-gray-600 md:text-xl">
            Fuel employee excitement with a swag store platform that celebrates and rewards every win.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button className="h-12 rounded-md bg-gratisswag-orange px-8 text-lg font-semibold text-white hover:bg-gratisswag-orange/90">
              Create My Store
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-md border-gratisswag-dark-gray bg-gratisswag-dark-gray px-8 text-lg font-semibold text-white hover:bg-gratisswag-dark-gray/90 hover:text-white"
            >
              See More
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/images/gratisswag-banner.png"
            alt="GratiSwag branded merchandise"
            width={600}
            height={600}
            className="h-auto w-full max-w-lg rounded-lg object-cover shadow-lg md:max-w-none"
            priority
          />
        </div>
      </div>
    </section>
  )
}
