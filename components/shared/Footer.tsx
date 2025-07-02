import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-gratisswag-blue py-12 text-white md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Left Section - Logo and Description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="GratiSwag Logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="text-2xl font-bold">GratiSwag</span>
            </div>
            <p className="text-sm text-gray-300">
              Connecting hearts through meaningful dedications, fostering deeper bonds, creating lasting memories, and
              celebrating the beauty of shared emotions.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
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
                <Link href="#" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="terms-of-service" className="text-gray-300 hover:text-white">
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
          <div className="col-span-1 md:col-span-4 lg:col-span-1">
            <h3 className="mb-4 text-lg font-semibold">
              Subscribe To Our <span className="text-gratisswag-orange">NEWSLETTER</span>
            </h3>
            <p className="mb-4 text-sm text-gray-300">Connect with us on social media and stay in the loop.</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter Your Email..."
                className="flex-1 rounded-md border border-gray-600 bg-gratisswag-blue px-4 py-2 text-white placeholder:text-gray-400 focus-visible:ring-gratisswag-orange"
              />
              <Button className="rounded-md bg-gratisswag-orange px-6 py-2 text-white hover:bg-gratisswag-orange/90">
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
