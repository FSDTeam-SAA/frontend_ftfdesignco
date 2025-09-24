"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const forgotPassword = async (email: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );
  const data = await response.json(); // parse body

  if (!response.ok) {
    // backend usually sends { message: "...error text..." }
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      toast.success("OTP sent successfully");
      router.push(
        "/otp?context=forgot-password&token=" + data.data?.accessToken
      );
    },
    onError: (error) => {
      // console.error("Error sending OTP:", error);
      toast.error(error.message || "Failed to send OTP");
    },
  });

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(email);
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4 sm:p-6">
      <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12 w-full max-w-5xl">
        {/* Left Section: Branding */}
        <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-1/2 lg:w-2/5">
          <Image
            src="/assets/logo.png"
            alt="GratiSwag Logo"
            width={435}
            height={269}
            className="w-full max-w-[200px] sm:max-w-[400px] h-auto object-contain"
            priority
          />
        </div>

        {/* Right Section: Form */}
        <Card className="w-full max-w-md sm:max-w-lg shadow-lg rounded-lg p-4 sm:p-6 bg-white">
          <CardHeader className="text-center md:text-left px-0 pt-0 pb-4">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2 justify-center md:justify-start">
              <h2 className="text-2xl sm:text-[32px] md:text-[40px] text-[#131313]">
                Forgot Password
              </h2>
            </CardTitle>
            <p className="text-sm sm:text-base text-[#424242] mt-2">
              Enter your registered email address, we&apos;ll send you a code to
              reset your password
            </p>
          </CardHeader>

          <form onSubmit={handleSendOtp} className="space-y-4">
            <CardContent className="grid gap-4 sm:gap-6 px-0 pb-0">
              <div className="grid gap-2">
                <Label
                  className="text-sm sm:text-[16px] md:text-[18px] text-[#131313] font-medium"
                  htmlFor="email"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-sm sm:text-[16px] md:text-[18px] text-[#131313] border border-[#616161] h-10 sm:h-12 rounded-[10px]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#D9AD5E] text-[#131313] text-sm sm:text-[16px] md:text-[18px] font-bold hover:bg-[#D9AD5E]/90 h-10 sm:h-12 rounded-[10px]"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Sending..." : "Send OTP"}
              </Button>

              <p className="text-sm sm:text-[14px] text-gray-600 text-center mt-4">
                <Link
                  href="/login"
                  className="text-sm sm:text-[14px] font-medium text-gray-600 hover:underline"
                >
                  Back to Login
                </Link>
              </p>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}
