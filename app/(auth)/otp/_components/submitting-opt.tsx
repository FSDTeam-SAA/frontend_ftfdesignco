"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { toast } from "sonner";

const safeJsonParse = (text: string) => {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

const verifyEmailApi = async (otp: string, token: string | null) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/verify-email`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ otp }),
    }
  );

  const text = await response.text();
  console.log("Raw response from server (verifyEmailApi):", text);

  const data = safeJsonParse(text);

  if (!response.ok) {
    const errorMsg = data?.message || text || "Verification failed";
    throw new Error(errorMsg);
  }

  if (!data) {
    throw new Error("Invalid response format from server");
  }

  return data;
};

const verifyForgotPasswordApi = async (otp: string, token: string | null) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-token`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ otp }),
    }
  );

  const text = await response.text();
  console.log("Raw response from server (verifyForgotPasswordApi):", text);

  const data = safeJsonParse(text);

  if (!response.ok) {
    const errorMsg = data?.message || text || "Verification failed";
    throw new Error(errorMsg);
  }

  if (!data) {
    throw new Error("Invalid response format from server");
  }

  return data;
};

export default function OtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const context = searchParams.get("context");
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    console.log("Received params:", { context, token, email });
  }, [context, token, email]);

  const mutation = useMutation({
    mutationFn: (otpCode: string) => {
      console.log("Submitting OTP:", otpCode);
      if (context === "register") {
        return verifyEmailApi(otpCode, token);
      } else if (context === "forgot-password") {
        return verifyForgotPasswordApi(otpCode, token);
      } else {
        return Promise.reject(new Error("Invalid context"));
      }
    },
    onSuccess: (data) => {
      console.log("Verification success:", data);
      toast.success(data.message || "Verification successful");

      if (context === "register") {
        router.push("/company");
      } else if (context === "forgot-password") {
        router.push(`/reset-password?token=` + data.data?.accessToken);
      }
    },
    onError: (error: Error) => {
      console.error("Verification error:", error);
      toast.error(error.message || "Verification failed. Please try again.");
    },
  });

  const handleOtpChange = (index: number, value: string) => {
    if (/^[0-9]*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pastedData.length >= 6) {
      const newOtp = pastedData.slice(0, 6).split("");
      setOtp(newOtp);
      const lastInput = document.getElementById(`otp-5`);
      lastInput?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("Verifying OTP:", otpCode);

    if (otpCode.length !== 6) {
      toast.error("Please enter a complete 6-digit OTP");
      return;
    }

    if (!context) {
      toast.error("Missing verification context");
      return;
    }

    mutation.mutate(otpCode);
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast.error("No email address found for resending OTP");
      return;
    }

    setIsResending(true);
    try {
      const response = await fetch(`/auth/user/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ email }),
      });

      const text = await response.text();
      console.log("Raw response from server (resend OTP):", text);

      const data = safeJsonParse(text);

      if (!response.ok) {
        const errorMsg = data?.message || text || "Failed to resend OTP";
        throw new Error(errorMsg);
      }

      toast.success("OTP resent successfully");
      setCountdown(30);
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to resend OTP"
      );
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4 sm:p-6">
      <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12 w-full max-w-5xl">
        <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-1/2 lg:w-2/5">
          <Image
            src="/assets/logo.png"
            alt="GratiSwag Logo"
            width={435}
            height={269}
            className="w-full max-w-[300px] sm:max-w-[400px] h-auto object-contain"
            priority
          />
        </div>

        <Card className="w-full max-w-md sm:max-w-lg shadow-lg rounded-lg p-4 sm:p-6 bg-white">
          <CardHeader className="text-center md:text-left px-0 pt-0 pb-4">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2 justify-center md:justify-start">
              <h2 className="text-2xl sm:text-[32px] md:text-[40px] text-[#131313]">
                Enter OTP
              </h2>
              <span role="img" aria-label="wave">
                👋
              </span>
            </CardTitle>
            <p className="text-sm sm:text-base text-[#424242] mt-2">
              We&apos;ve sent a 6-digit code to {email || "your email"}
            </p>
          </CardHeader>

          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <CardContent className="grid gap-4 sm:gap-6 px-0 pb-0">
              <div className="flex justify-center space-x-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={(e) => handlePaste(e)}
                    className="w-12 h-12 sm:h-14 text-lg sm:text-xl text-center font-semibold border-2 border-[#616161] rounded-[10px] focus-visible:ring-2 focus-visible:ring-[#D9AD5E]"
                    required
                  />
                ))}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#D9AD5E] hover:bg-[#D9AD5E]/90 text-[#131313] font-bold h-[48px] rounded-[10px] transition-colors"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  "Verify"
                )}
              </Button>

              <div className="text-center mt-2">
                {countdown > 0 ? (
                  <p className="text-sm text-gray-500">
                    Resend OTP in {countdown} seconds
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isResending}
                    className="text-sm text-[#D9AD5E] hover:text-[#D9AD5E]/80 font-medium disabled:opacity-50"
                  >
                    {isResending
                      ? "Resending..."
                      : "Didn't receive code? Resend"}
                  </button>
                )}
              </div>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}
