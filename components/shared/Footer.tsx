import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Subscribe from "./subscribe";

export function Footer() {
  return (
    <footer className="bg-[#035F8A] py-8 sm:py-12 md:py-16 text-white border ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 sm:gap-6 py-6 sm:py-8">
          {/* Left Section - Logo and Description */}
          <div className="md:col-span-4 mb-6 md:mb-0">
            <div className="mb-4 flex items-center gap-2">
              <Image
                src="/assets/footerlogo.svg"
                alt="GratiSwag Logo"
                width={1000}
                height={1000}
                className="w-16 h-10 sm:w-[104px] sm:h-[64px] z-10"
              />
            </div>
            <p className="text-xs sm:text-sm text-gray-300">
              Connecting hearts through meaningful dedications, fostering deeper
              bonds, creating lasting memories, and celebrating the beauty of
              shared emotions.
            </p>
          </div>

          {/* Company Links */}
          <div className="md:col-span-2 mb-6 md:mb-0">
            <h3 className="mb-4 text-base sm:text-lg font-semibold">Company</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/about-us"
                  className="text-gray-300 hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-gray-300 hover:text-white">
                  Blog
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  All Awag
                </Link>
              </li> */}
              <li>
                <Link
                  href="/contact-us"
                  className="text-gray-300 hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="md:col-span-2 mb-6 md:mb-0">
            <h3 className="mb-4 text-base sm:text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-300 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-gray-300 hover:text-white"
                >
                  Terms Of Service
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white">
                  FAQ
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Help Center
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="md:col-span-3 ">
            <h3 className="mb-4 text-base sm:text-lg font-semibold">
              Subscribe To Our{" "}
              <span className="text-[#D9AD5E]">NEWSLETTER</span>
            </h3>
            <p className="mb-4 text-xs sm:text-sm text-gray-300">
              Connect with us on social media and stay in the loop.
            </p>
            <Subscribe />
          </div>
        </div>

        <Separator className="my-6 sm:my-8 bg-white/60" />

        {/* Copyright */}
        <div className="text-center text-xs sm:text-sm text-[#E7E7E7]">
          {"© 2025 Swag. All Rights Reserved"}
        </div>
      </div>
    </footer>
  );
}
