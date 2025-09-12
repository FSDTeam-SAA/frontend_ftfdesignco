"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
export default function EmployeeLoginPage() {
  const [employeeId, setEmployeeId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log(employeeId, companyId, password);

    const res = await signIn("credentials", {
      redirect: false,
      role: "employee",
      companyId,
      employeeId,
      password,
    });
    console.log("loing", res);
    if (res?.ok) {
      toast.success("Login successful!");
      router.push(`/shop?companyId=${companyId}`);
    } else {
      setError("Invalid employee ID or password.");
      toast.error("Invalid employee ID or password.");
    }

    setLoading(false);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
                Welcome
              </h2>
              <span role="img" aria-label="wave">
                👋
              </span>
            </CardTitle>
            <p className="text-sm sm:text-base text-[#424242] mt-2">
              Employee login
            </p>
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="grid gap-4 sm:gap-6 px-0 pb-0">
              <div className="grid gap-2">
                <Label
                  className="text-sm sm:text-[16px] md:text-[18px] text-[#131313] font-medium"
                  htmlFor="employee-id"
                >
                  Employee ID
                </Label>
                <Input
                  id="employee-id"
                  type="text"
                  placeholder="Enter your ID"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  required
                  className="text-sm sm:text-[16px] md:text-[18px] text-[#131313] border border-[#616161] h-10 sm:h-12 rounded-[10px]"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  className="text-sm sm:text-[16px] md:text-[18px] text-[#131313] font-medium"
                  htmlFor="employee-id"
                >
                  Company ID
                </Label>
                <Input
                  id="company-id"
                  type="text"
                  placeholder="Enter your Company ID"
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                  required
                  className="text-sm sm:text-[16px] md:text-[18px] text-[#131313] border border-[#616161] h-10 sm:h-12 rounded-[10px]"
                />
              </div>

              <div className="grid gap-2">
                <Label
                  className="text-sm sm:text-[16px] md:text-[18px] text-[#131313] font-medium"
                  htmlFor="password"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"} // Toggle input type based on showPassword
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="text-sm sm:text-[16px] md:text-[18px] text-[#131313] border border-[#616161] h-10 sm:h-12 rounded-[10px] pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-800"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <Eye className="h-5 w-5" />
                    ) : (
                      <EyeOff className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember-me" />
                  <Label
                    htmlFor="remember-me"
                    className="text-sm sm:text-[14px]"
                  >
                    Remember Me
                  </Label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm sm:text-[14px] font-medium text-gray-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-[#D9AD5E] text-[#131313] text-sm sm:text-[16px] md:text-[18px] font-bold hover:bg-[#D9AD5E]/90 h-10 sm:h-12 rounded-[10px]"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}
