"use client"

import Image from "next/image"
import Link from "next/link"
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
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Swag Store", href: "#" },
    { name: "Swag Packs", href: "#" },
    { name: "Pricing", href: "/pricing" },
    { name: "Catalog", href: "/catalog" },
    { name: "Contract Us", href: "/contact-us" },
    { name: "All products", href: "/all-product" },
  ]

  return (
    <header className="w-full sticky top-0 z-50 bg-white">
      {/* Top Bar */}
      <div className="bg-gratisswag-dark-gray h-2 w-full" />

      {/* Main Navbar */}
      <nav className="container mx-auto flex h-20 items-center justify-between px-4 py-2 md:px-6">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="GratiSwag Logo"
            width={1000}
            height={1000}
            className="h-[64px] w-[104px]"
          />
        
        </Link>

        {/* Search Bar (Desktop) */}
        <div className="relative hidden flex-1 max-w-md md:flex">
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-full border border-gray-300 pr-10 focus-visible:ring-gratisswag-orange"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-0 top-0 h-full rounded-full bg-gratisswag-orange hover:bg-gratisswag-orange/90"
          >
            <Search className="h-5 w-5 text-white" />
            <span className="sr-only">Search</span>
          </Button>
        </div>

        {/* Right-side Icons and Buttons */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-6 w-6 text-gratisswag-dark-gray" />
            <Badge className="absolute -right-1 -top-1 h-4 min-w-4 rounded-full bg-gratisswag-orange px-1 text-xs text-white">
              0
            </Badge>
            <span className="sr-only">Shopping Cart</span>
          </Button>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User Avatar" />
                  <AvatarFallback className="bg-gratisswag-accent-blue text-white">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">User Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Create My Store Button */}
          <Button className="hidden bg-gratisswag-orange hover:bg-gratisswag-orange/90 md:inline-flex">
            Create My Store
          </Button>

          {/* Mobile Sheet Trigger */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 pt-8">
                {/* Search Bar (Mobile) */}
                <div className="relative flex w-full md:hidden">
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-full border border-gray-300 pr-10 focus-visible:ring-gratisswag-orange"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="absolute right-0 top-0 h-full rounded-full bg-gratisswag-orange hover:bg-gratisswag-orange/90"
                  >
                    <Search className="h-5 w-5 text-white" />
                    <span className="sr-only">Search</span>
                  </Button>
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium text-gratisswag-dark-gray hover:text-gratisswag-orange"
                  >
                    {link.name}
                  </Link>
                ))}
                <Button className="mt-4 bg-gratisswag-orange hover:bg-gratisswag-orange/90">Create My Store</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Bottom Navigation Links (Desktop) */}
      <div className="hidden border-b border-gray-200 bg-white py-3 md:block">
        <div className="container mx-auto flex justify-center gap-8 px-4 md:px-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-gratisswag-dark-gray hover:text-gratisswag-orange ${
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
