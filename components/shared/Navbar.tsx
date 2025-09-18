"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { CreateStoreModal } from "../web_components/create-store-modal";
import { useRouter, usePathname } from "next/navigation";
import Hideon from "@/provider/Hideon";

export function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const role = session?.user?.role;
  const isLoggedIn = !!role;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = session?.accessToken;
  const shop = session?.user?.shop;
  const accessSubScription = session?.user?.isPaid === true;
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleClick = () => {
    if (!token) {
      router.push("/login");
    } else if (!accessSubScription) {
      router.push("/pricing");
    } else {
      setIsModalOpen(true);
    }
  };

  // const handleShopClick = () => {
  //   window.location.href = "https://shop.companycasuals.com/";
  // };

  const navLinks = [
    { name: "Home", href: "/" },
    // { name: "Shop", href: "#", onClick: handleShopClick },
    { name: "Swag Store", href: "https://shop.companycasuals.com" },
    { name: "Swag Packs", href: "/swagpacks" },
    { name: "Pricing", href: "/pricing" },
    { name: "Products Catalog", href: "https://shop.companycasuals.com" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "All products", href: "/all-product" },
  ];

  return (
    <Hideon routes={["/shop", "/cart", "/checkout", "/my-account"]}>
      <header className="w-full  sticky top-0 z-50 bg-white shadow-sm">
        {/* Top Bar */}
        {/* <div className="bg-gratisswag-dark-gray h-2 w-full" /> */}

        {/* Main Navbar */}
        <nav className="container mx-auto flex h-16 items-center justify-between px-4 py-2 pt-5 sm:h-20 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/logo.svg"
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
              className="w-full rounded-full border border-gray-300 py-2 pr-12 text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-[#D9AD5E]"
              aria-label="Search products"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[#D9AD5E] hover:bg-[#f5b641]"
              aria-label="Submit search"
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-[#131313]" />
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
                    <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-[#D9AD5E] px-1.5 text-xs font-semibold text-white">
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
                          <AvatarImage
                            src="/placeholder.svg"
                            alt="User Avatar"
                          />
                          <AvatarFallback className="bg-[#1059EF] text-white">
                            <User className="h-4 w-4 sm:h-5 sm:w-5" />
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="bg-white w-48 cursor-pointer"
                      align="end"
                    >
                      {role === "employee" ? (
                        <>
                          <DropdownMenuLabel className="cursor-pointer">
                            <Link href="/my-account">My Account</Link>
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild className="cursor-pointer">
                            <Button
                              variant="ghost"
                              className="justify-start px-4 py-2 text-base text-red-600 hover:bg-red-50 hover:text-red-700"
                              onClick={() => signOut({ callbackUrl: "/" })}
                            >
                              {/* <LogOut className="w-5 h-5 mr-3" /> */}
                              Log out
                            </Button>
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <>
                          <DropdownMenuLabel className="cursor-pointer">
                            <Link href="/dashboard">Dashboard</Link>
                          </DropdownMenuLabel>
                          <DropdownMenuLabel className="cursor-pointer">
                            <span onClick={() => signOut({ callbackUrl: "/" })}>
                              Log out
                            </span>
                          </DropdownMenuLabel>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </>
            ) : (
              /* Login Button (Hidden on small devices, shown on md and above) */
              <Link href="/login" className="hidden md:inline-flex">
                <Button className="bg-[#D9AD5E] rounded-[7px] hover:bg-[#f5b641] text-sm sm:text-base px-3 sm:px-4">
                  Login
                </Button>
              </Link>
            )}

            {/* Conditionally render "Create My Store" button or "My Shop" link */}
            {shop ? (
              <Link href="/shop">
                <Button className="hidden bg-[#D9AD5E] hover:bg-[#f5b641] text-sm sm:text-base px-3 sm:px-4 lg:inline-flex rounded-[7px]">
                  My Shop
                </Button>
              </Link>
            ) : (
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="hidden bg-[#D9AD5E] hover:bg-[#f5b641] text-sm sm:text-base px-3 sm:px-4 lg:inline-flex rounded-[7px]"
                    onClick={handleClick}
                  >
                    Create My Store
                  </Button>
                </DialogTrigger>
                <CreateStoreModal />
              </Dialog>
            )}

            {/* Mobile Sheet Trigger */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] sm:w-[360px] bg-white"
              >
                <nav className="flex flex-col gap-4 pt-6">
                  {/* Search Bar (Mobile) */}
                  <div className="relative flex w-full md:hidden">
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="w-full rounded-full border border-gray-300 py-2 pr-12 text-sm focus-visible:ring-2 focus-visible:ring-[#D9AD5E]"
                      aria-label="Search products"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[#D9AD5E] hover:bg-[#D9AD5E]/90"
                      aria-label="Submit search"
                    >
                      <Search className="h-4 w-4 text-white" />
                    </Button>
                  </div>

                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      // onClick={link.onClick || (() => setIsSheetOpen(false))}
                      className={`text-base font-medium transition-colors ${
                        pathname === link.href
                          ? "text-[#D9AD5E] font-semibold"
                          : "text-gratisswag-dark-gray hover:text-[#D9AD5E]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}

                  {!isLoggedIn && (
                    <Link href="/login" onClick={() => setIsSheetOpen(false)}>
                      <Button className="mt-2 bg-[#D9AD5E] hover:bg-[#D9AD5E]/90 text-sm w-full">
                        Login
                      </Button>
                    </Link>
                  )}

                  {/* Conditionally render "Create My Store" button or "My Shop" link (Mobile) */}
                  {shop ? (
                    <Link href="/shop" onClick={() => setIsSheetOpen(false)}>
                      <Button className="mt-2 bg-[#D9AD5E] hover:bg-[#D9AD5E]/90 text-sm w-full">
                        My Shop
                      </Button>
                    </Link>
                  ) : (
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                      <DialogTrigger asChild>
                        <Button
                          className="mt-2 bg-[#D9AD5E] hover:bg-[#D9AD5E]/90 text-sm w-full"
                          onClick={handleClick}
                        >
                          Create My Store
                        </Button>
                      </DialogTrigger>
                      <CreateStoreModal />
                    </Dialog>
                  )}
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
                // onClick={link.onClick}
                className={`text-sm lg:text-base transition-colors ${
                  pathname === link.href
                    ? "text-[#D9AD5E] font-semibold"
                    : "text-gratisswag-dark-gray hover:text-[#D9AD5E]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </header>
    </Hideon>
  );
}
