"use client"

import Image from "next/image"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { Menu, Search, ShoppingCart, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  const { data: session } = useSession()
  const role = session?.user?.role
  const isLoggedIn = !!session

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Swag Store", href: "#" },
    { name: "Swag Packs", href: "#" },
    { name: "Pricing", href: "/pricing" },
    { name: "Catalog", href: "/catalog" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "All products", href: "/all-product" },
  ]

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-gratisswag-dark-gray h-2 w-full" />

      {/* Main Navbar */}
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 py-2 sm:h-20 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="GratiSwag Logo"
            width={104}
            height={64}
            className="h-10 w-auto sm:h-12 lg:h-16"
            priority
          />
        </Link>

        {/* Search Bar (Desktop) */}
        <div className="relative hidden flex-1 mx-4 sm:mx-6 lg:mx-8 md:flex max-w-xs sm:max-w-sm lg:max-w-md">
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full rounded-full border border-gray-300 py-2 pr-12 text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-gratisswag-orange"
            aria-label="Search products"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-gratisswag-orange hover:bg-gratisswag-orange/90"
            aria-label="Submit search"
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </Button>
        </div>

        {/* Right-side Icons and Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {isLoggedIn ? (
            <>
              {/* Cart Icon (Only for employee role) */}
              {role === "employee" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-10 w-10"
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-gratisswag-dark-gray" />
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-gratisswag-orange px-1.5 text-xs font-semibold text-white">
                    0
                  </Badge>
                </Button>
              )}

              {/* User Dropdown */}
              {(role === "company_admin" || role === "employee") && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full"
                      aria-label="User menu"
                    >
                      <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                        <AvatarImage src="/placeholder.svg" alt="User Avatar" />
                        <AvatarFallback className="bg-gratisswag-accent-blue text-white">
                          <User className="h-4 w-4 sm:h-5 sm:w-5" />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white w-48" align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </>
          ) : (
            /* Login Button (Hidden on small devices, shown on md and above) */
            <Link href="/login" className="hidden md:inline-flex">
              <Button className="bg-gratisswag-orange hover:bg-gratisswag-orange/90 text-sm sm:text-base px-3 sm:px-4">
                Login
              </Button>
            </Link>
          )}

          {/* Create My Store Button */}
          <Button
            className="hidden bg-gratisswag-orange hover:bg-gratisswag-orange/90 text-sm sm:text-base px-3 sm:px-4 lg:inline-flex"
            asChild
          >
            <Link href="/create-store">Create My Store</Link>
          </Button>

          {/* Mobile Sheet Trigger */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[360px] bg-white">
              <nav className="flex flex-col gap-4 pt-6">
                {/* Search Bar (Mobile) */}
                <div className="relative flex w-full md:hidden">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full rounded-full border border-gray-300 py-2 pr-12 text-sm focus-visible:ring-2 focus-visible:ring-gratisswag-orange"
                    aria-label="Search products"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-gratisswag-orange hover:bg-gratisswag-orange/90"
                    aria-label="Submit search"
                  >
                    <Search className="h-4 w-4 text-white" />
                  </Button>
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-base font-medium text-gratisswag-dark-gray hover:text-gratisswag-orange transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                {!isLoggedIn && (
                  <Link href="/login">
                    <Button className="mt-2 bg-gratisswag-orange hover:bg-gratisswag-orange/90 text-sm w-full">
                      Login
                    </Button>
                  </Link>
                )}
                <Button
                  className="mt-2 bg-gratisswag-orange hover:bg-gratisswag-orange/90 text-sm w-full"
                  asChild
                >
                  <Link href="/create-store">Create My Store</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Bottom Navigation Links (Desktop) */}
      <div className="hidden border-b border-gray-200 bg-white py-3 md:block">
        <div className="container mx-auto flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm lg:text-base text-gratisswag-dark-gray hover:text-gratisswag-orange transition-colors ${
                link.name === "Home" ? "text-gratisswag-orange font-semibold" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}