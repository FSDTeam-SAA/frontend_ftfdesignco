import type { ReactNode } from "react";
import "../../app/globals.css";
import Image from "next/image";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left Section: Logo */}
        <div className="hidden md:flex justify-center items-center">
          {/* Replace with your actual GratisSwag logo */}
          <Image
            src="/placeholder.svg?height=150&width=400"
            alt="GratisSwag Logo"
            width={400}
            height={150}
            className="object-contain"
          />
        </div>

        {/* Right Section: Auth Forms */}
        <div className="w-full max-w-md mx-auto">{children}</div>
      </div>
    </div>
  );
}
