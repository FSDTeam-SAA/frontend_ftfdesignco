import Image from "next/image"

export default function Page() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">About Us</h2>
            <p className="text-gray-600 mb-6">
              We are a leading swag platform that helps businesses create memorable brand experiences through
              high-quality promotional products. Our mission is to make corporate gifting simple, efficient, and
              impactful.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">30K+</div>
                <div className="text-sm text-gray-500">Our Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">12K+</div>
                <div className="text-sm text-gray-500">Satisfied Brands</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">2K+</div>
                <div className="text-sm text-gray-500">Company List</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="About Us"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
