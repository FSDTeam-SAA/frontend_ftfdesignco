import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-gratisswag-blue py-12 text-white md:py-16">
      <div className="container">
        <div className="grid grid-cols-11 gap-4 py-8">
          {/* Left Section - Logo and Description */}
          <div className="col-span-1 md:col-span-4">
            <div className="mb-4 flex items-center gap-2">
              <Image
                src="/assets/logo.png"
                alt="GratiSwag Logo"
                width={40}
                height={40}
                className="w-[104px] h-[64px]"
              />
            </div>
            <p className="text-sm text-gray-300">
              Connecting hearts through meaningful dedications, fostering deeper bonds, creating lasting memories, and
              celebrating the beauty of shared emotions.
            </p>
          </div>

          {/* Company Links */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about-us" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  All Awag
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="mb-4 text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-300 hover:text-white">
                  Terms Of Service
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="col-span-1 md:col-span-3">
            <h3 className="mb-4 text-lg font-semibold">
              Subscribe To Our <span className="text-[#D9AD5E]">NEWSLETTER</span>
            </h3>
            <p className="mb-4 text-sm text-gray-300">Connect with us on social media and stay in the loop.</p>
            <div className="flex border border-white">
              <Input
                type="email"
                placeholder="Enter Your Email..."
                className=" bg-gratisswag-blue px-4 py-2 text-white placeholder:text-white"
              />
              <Button className="rounded-md bg-[#D9AD5E] px-6 py-2 text-white hover:bg-[#f5b641]">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-600" />

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400">{"© 2025 Swag. All Rights Reserved"}</div>
      </div>
    </footer>
  )
}
