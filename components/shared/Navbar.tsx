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
import { useState, useEffect } from "react";
import { CreateStoreModal } from "../web_components/create-store-modal";
import { useRouter, usePathname } from "next/navigation";
import Hideon from "@/provider/Hideon";
import { fetchemployecartdata } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

// Define TypeScript interfaces
interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  productImage: string;
  category: {
    _id: string;
    title: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  success: boolean;
  code: number;
  message: string;
  data: Product[];
  pagination?: {
    totalProducts: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  };
}

interface SessionUser {
  role?: string;
  shop?: string;
  isPaid?: boolean;
}

interface SessionData {
  user?: SessionUser;
  accessToken?: string;
}

export function Navbar() {
  const { data: session } = useSession() as { data: SessionData | null };
  const router = useRouter();
  const pathname = usePathname();
  const role = session?.user?.role;
  const isLoggedIn = !!role;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = session?.accessToken;
  const shop = session?.user?.shop;
  const accessSubScription = session?.user?.isPaid === true;
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleClick = () => {
    if (!token) {
      router.push("/login");
    } else if (!accessSubScription) {
      router.push("/pricing");
    } else {
      setIsModalOpen(true);
    }
  };

  const { data: carddata } = useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchemployecartdata(),
    enabled: role === "employee" && !!token,
  });

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/get-all`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse | Product[] = await response.json();

      // Handle both response formats - array or object with data property
      let products: Product[] = [];

      if (Array.isArray(data)) {
        products = data;
      } else if (data && typeof data === "object" && "data" in data) {
        products = data.data || [];
      }

      const filtered = products.filter((item: Product) =>
        item.title?.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setShowResults(true);
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
    }
    setIsSearching(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
      setSearchQuery("");
    }
  };

  // const handleResultClick = (productId: string) => {
  //   setShowResults(false);
  //   setSearchQuery("");
  //   router.push(`/product/${productId}`);
  // };

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (searchQuery.trim() && searchResults.length > 0) {
      setShowResults(true);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowResults(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Swag Store", href: "/swagstore" },
    { name: "Swag Packs", href: "/swagpacks" },
    { name: "Pricing", href: "/pricing" },
    { name: "Products Catalog", href: "https://shop.companycasuals.com" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "All products", href: "/all-product" },
  ];

  return (
    <Hideon routes={["/shop", "/cart", "/checkout", "/my-account"]}>
      <header className="w-full sticky top-0 z-50 bg-white shadow-sm">
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
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full rounded-full border border-gray-300 py-2 pr-12 text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-[#D9AD5E]"
                aria-label="Search products"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                onClick={handleInputClick}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[#D9AD5E] hover:bg-[#f5b641]"
                aria-label="Submit search"
                disabled={isSearching}
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-[#131313]" />
              </Button>
            </form>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div
                className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                {searchResults.map((item: Product) => (
                  <Link
                    href={`/all-product/${item._id}`}
                    key={item._id}
                    className="block"
                  >
                    <div className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                      <Image
                        src={item.productImage || "/placeholder.svg"}
                        alt={item.title}
                        width={24}
                        height={20}
                        className="w-6 h-5 object-cover rounded"
                      />
                      <span className="flex-1">{item.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* No Results Found */}
            {showResults &&
              searchQuery &&
              !isSearching &&
              searchResults.length === 0 && (
                <div
                  className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 p-4"
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                  <p className="text-sm text-gray-500">
                    No products found for &quot;{searchQuery}&quot;
                  </p>
                </div>
              )}

            {/* Loading State */}
            {isSearching && (
              <div
                className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 p-4"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <p className="text-sm text-gray-500">Searching...</p>
              </div>
            )}
          </div>

          {/* Right-side Icons and Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {isLoggedIn ? (
              <>
                {/* Cart Icon (Only for employee role) */}
                {role === "employee" && (
                  <Link href={"/cart"}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative h-10 w-10"
                      aria-label="Shopping Cart"
                    >
                      <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-gratisswag-dark-gray" />
                      <Badge className="absolute -right-1 -top-1 h-5 w-5 hover:bg-[#D9AD5E] rounded-full bg-[#D9AD5E] px-1.5 text-xs font-semibold text-white">
                        {Array.isArray(carddata) ? carddata.length : 0}
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
                            <Link href="/my-account" className="w-full block">
                              My Account
                            </Link>
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild className="cursor-pointer">
                            <Button
                              variant="ghost"
                              className="justify-start px-4 py-2 text-base text-red-600 hover:bg-red-50 hover:text-red-700 w-full"
                              onClick={() => signOut({ callbackUrl: "/" })}
                            >
                              Log out
                            </Button>
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <>
                          <DropdownMenuLabel className="cursor-pointer">
                            <Link href="/dashboard" className="w-full block">
                              Dashboard
                            </Link>
                          </DropdownMenuLabel>
                          <DropdownMenuLabel className="cursor-pointer">
                            <button
                              onClick={() => signOut({ callbackUrl: "/" })}
                              className="w-full text-left"
                            >
                              Log out
                            </button>
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
                      value={searchQuery}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearchQuery(e.target.value)
                      }
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[#D9AD5E] hover:bg-[#D9AD5E]/90"
                      aria-label="Submit search"
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        handleSearch(searchQuery);
                      }}
                    >
                      <Search className="h-4 w-4 text-white" />
                    </Button>
                  </div>

                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`text-base font-medium transition-colors ${
                        pathname === link.href
                          ? "text-[#D9AD5E] font-semibold"
                          : "text-gratisswag-dark-gray hover:text-[#D9AD5E]"
                      }`}
                      onClick={() => setIsSheetOpen(false)}
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
