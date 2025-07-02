import Image from "next/image";

export default function Page() {
  return (
    <section>
      <div className="container text-center py-24 space-y-4">
        <h2 className="text-5xl font-bold">About Us</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          We are a leading swag platform that helps businesses create memorable
          brand experiences through high-quality promotional products. Our
          mission is to make corporate gifting simple, efficient, and impactful.
        </p>
      </div>
      <div className="container pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div>
              <h2 className="text-3xl font-bold mb-6">About Us</h2>
              <p className="text-gray-600 mb-6">
                We are a leading swag platform that helps businesses create
                memorable brand experiences through high-quality promotional
                products. Our mission is to make corporate gifting simple,
                efficient, and impactful.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our MIssion</h2>
              <p className="text-gray-600 mb-6">
                We are a leading swag platform that helps businesses create
                memorable brand experiences through high-quality promotional
                products. Our mission is to make corporate gifting simple,
                efficient, and impactful.
              </p>
            </div>
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
              src="/assets/about.png"
              alt="About Us"
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-4 mt-8 lg:mt-0">
            <h2 className="text-2xl font-bold">What We Offer</h2>
            <div className="space-y-2">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                eget euismod velit. Ut dapibus est urna. Suspendisse dictum
                facilisis ullamcorper.
              </p>
              <div>
                <ul className="list-disc">
                  <li>
                    <span className="font-bold">Lorem ipsum</span>Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed eget
                    euismod velit. Ut dapibus est urna. Suspendisse dictum
                    facilisis ullamcorper. Maecenas vitae efficitur tortor, in
                    placerat dui.
                  </li>
                </ul>
                <ul className="list-disc">
                  <li>
                    <span className="font-bold">Lorem ipsum</span>Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed eget
                    euismod velit. Ut dapibus est urna. Suspendisse dictum
                    facilisis ullamcorper. Maecenas vitae efficitur tortor, in
                    placerat dui.
                  </li>
                </ul>
                <ul className="list-disc">
                  <li>
                    <span className="font-bold">Lorem ipsum</span>Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed eget
                    euismod velit. Ut dapibus est urna. Suspendisse dictum
                    facilisis ullamcorper. Maecenas vitae efficitur tortor, in
                    placerat dui.
                  </li>
                </ul>
                <ul className="list-disc">
                  <li>
                    <span className="font-bold">Lorem ipsum</span>Lorem ipsum
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
            <h2 className="text-2xl font-bold">Unique Business content</h2>
            <div className="space-y-2">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                eget euismod velit. Ut dapibus est urna. Suspendisse dictum
                facilisis ullamcorper.
              </p>
              <div>
                <ul className="list-disc">
                  <li>
                    <span className="font-bold">Lorem ipsum</span>Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed eget
                    euismod velit. Ut dapibus est urna. Suspendisse dictum
                    facilisis ullamcorper. Maecenas vitae efficitur tortor, in
                    placerat dui.
                  </li>
                </ul>
                <ul className="list-disc">
                  <li>
                    <span className="font-bold">Lorem ipsum</span>Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed eget
                    euismod velit. Ut dapibus est urna. Suspendisse dictum
                    facilisis ullamcorper. Maecenas vitae efficitur tortor, in
                    placerat dui.
                  </li>
                </ul>
                <ul className="list-disc">
                  <li>
                    <span className="font-bold">Lorem ipsum</span>Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed eget
                    euismod velit. Ut dapibus est urna. Suspendisse dictum
                    facilisis ullamcorper. Maecenas vitae efficitur tortor, in
                    placerat dui.
                  </li>
                </ul>
                <ul className="list-disc">
                  <li>
                    <span className="font-bold">Lorem ipsum</span>Lorem ipsum
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
            <h2 className="text-2xl font-bold">Our Commitment</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
              euismod velit. Ut dapibus est urna. Suspendisse dictum facilisis
              ullamcorper.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Join Us</h2>
            <div className="space-y-2">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                eget euismod velit. Ut dapibus est urna. Suspendisse dictum
                facilisis ullamcorper.
              </p>
              <p>
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
