

"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React, { useCallback } from "react";

export default function WelcomePage() {
  const router = useRouter();

  const handleNavigate = useCallback((path: string) => {
    // Delay navigation slightly to prevent React DOM cleanup errors
    setTimeout(() => {
      router.push(path);
    }, 200); // 200ms delay
  }, [router]);

  return (
    <Card className="w-full max-w-md bg-white shadow-lg">
      <CardContent className="p-8">
        <div className="mb-6">
          <h2 className="text-[40px] font-medium text-[#131313] mb-1">Welcome 👋</h2>
          <p className="text-sm text-gray-600">Please login here</p>
        </div>

        <div className="flex justify-center">
          <Image
            src="/assets/logo.png"
            width={1000}
            height={1000}
            alt="GratiSwag Logo"
            className="w-full max-w-[435px] sm:max-w-[269px] h-auto object-contain"
            priority
          />
        </div>

        <div className="flex items-center gap-4 mt-10">
          <Button
            onClick={() => handleNavigate("/company")}
            className="w-full bg-[#D9AD5E] hover:bg-[#D9AD5E]/90 h-[50px] rounded-[8px] text-white font-medium py-3"
          >
            Company Login
          </Button>
          <Button
            onClick={() => handleNavigate("/employee")}
            variant="outline"
            className="w-full border-gray-300 h-[50px] rounded-[8px] text-gray-700 font-medium py-3"
          >
            Employee Login
          </Button>
        </div>

        <p className="text-sm text-gray-600 mt-6">
          {"Don't have an account? "}
          <button
            onClick={() => handleNavigate("/signup")}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </CardContent>
    </Card>
  );
}
