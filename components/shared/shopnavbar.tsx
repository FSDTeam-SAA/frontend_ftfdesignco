"use client";

import { Menu, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { fetchemployecartdata } from "@/lib/api";

export default function ShopNavbar() {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const token = session?.accessToken;

  // const {
  //   data: shopData,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["shopData", token],
  //   queryFn: () => employeecard(),
  //   enabled: role !== "company_admin" && !!token,
  // });

  const { data: carddata } = useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchemployecartdata(),
    enabled: role === "employee" && !!token,
  });

  return (
    <header className="sticky top-0 z-50 py-5 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white">
            <nav className="flex flex-col gap-4">
              <div className="px-2 py-1 flex items-center">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/assets/logo.svg"
                    alt="GratiSwag Logo"
                    width={140}
                    height={80}
                    className="h-12 w-auto sm:h-14 lg:h-16"
                    priority
                  />
                </Link>
              </div>
              <Link
                href="/shop"
                className="block px-2 py-1 text-[#EFA610] text-lg hover:text-foreground/80"
              >
                Shop
              </Link>
              <Link
                href="/shop"
                className="block px-2 py-1 text-lg text-[#EFA610] hover:text-foreground/80"
              >
                All Products
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/logo.svg"
              alt="GratiSwag Logo"
              width={140}
              height={80}
              className="h-12 w-auto sm:h-14 lg:h-16"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex items-center">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/shop"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm md:text-[18px] font-medium text-[#EFA610] transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  All Products
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side actions */}
        <div className="flex items-center  space-x-4">
          {/* Shopping Cart */}
          {role === "employee" && (
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="h-6 w-6 text-gratisswag-dark-gray" />
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-[#424242] px-1.5 text-xs font-semibold text-white">
                  {carddata?.length ?? 0}
                </Badge>
              </Button>
            </Link>
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
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg" alt="User Avatar" />
                    <AvatarFallback className="bg-[#D9AD5E] hover:bg-[#f5b641] text-white">
                      <User className="h-5 w-5" />
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
                    <DropdownMenuLabel>
                      <Link href="/my-account">My Account</Link>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Button
                        variant="ghost"
                        className="justify-start px-4 py-2 text-base text-red-600 hover:text-red-700"
                        onClick={() => signOut({ callbackUrl: "/" })}
                      >
                        Log out
                      </Button>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuLabel>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuLabel>
                    <DropdownMenuLabel>
                      <span onClick={() => signOut({ callbackUrl: "/" })}>
                        Log out
                      </span>
                    </DropdownMenuLabel>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
