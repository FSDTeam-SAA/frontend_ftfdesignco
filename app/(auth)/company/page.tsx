// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Card, CardContent } from "@/components/ui/card";
// import { toast } from "sonner";

// export default function CompanyLoginPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     rememberMe: false,
//   });

//   const handleInputChange = (field: string, value: string | boolean) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await signIn("credentials", {
//         email: formData.email,
//         password: formData.password,
//         role: "company", // 🔥 MUST include this!
//         redirect: false,
//       });

//       if (res?.ok) {
//         toast.success("Login successful!");
//         router.push("/");
//       } else {
//         toast.error(res?.error || "Invalid email or password");
//       }
//     } catch (error) {
//       toast.error("An unexpected error occurred. Please try again.");
//       console.error("Login error:", error);
//     }
//   };

//   return (
//     <Card className="w-full max-w-md bg-white shadow-lg">
//       <CardContent className="p-8">
//         <div className="mb-6">
//           <h2 className="text-2xl sm:text-[32px] md:text-[40px] text-[#131313]">Welcome 👋</h2>
//           <p className="text-sm text-gray-600">Please login here</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label htmlFor="email">Email Address</Label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="Enter your email address"
//               value={formData.email}
//               onChange={(e) => handleInputChange("email", e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               type="password"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={(e) => handleInputChange("password", e.target.value)}
//               required
//             />
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <Checkbox
//                 id="remember"
//                 checked={formData.rememberMe}
//                 onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
//               />
//               <Label htmlFor="remember">Remember Me</Label>
//             </div>
//             <button
//               type="button"
//               onClick={() => router.push("/forgot-password")}
//               className="text-sm text-blue-600 hover:underline"
//             >
//               Forgot Password?
//             </button>
//           </div>

//           <Button
//             type="submit"
//             className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 mt-6"
//           >
//             Login
//           </Button>
//         </form>

//         <p className="text-sm text-gray-600 text-center mt-6">
//           Don&apos;t have an account?{" "}
//           <button onClick={() => router.push("/signup")} className="text-blue-600 hover:underline">
//             Sign Up
//           </button>
//         </p>
//       </CardContent>
//     </Card>
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

export default function CompanyLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        role: "company",
        redirect: false,
      });

      if (res?.ok) {
        toast.success("Login successful!");
        router.push("/");
      } else {
        toast.error(res?.error || "Invalid email or password");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    }
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
              <h2 className="text-2xl sm:text-[32px] md:text-[40px] text-[#131313]">Welcome</h2>
              <span role="img" aria-label="wave">👋</span>
            </CardTitle>
            <p className="text-sm sm:text-base text-[#424242] mt-2">Company login</p>
          </CardHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <CardContent className="grid gap-4 sm:gap-6 px-0 pb-0">
              <div className="grid gap-2">
                <Label className="text-sm sm:text-[16px] md:text-[18px] text-[#131313] font-medium" htmlFor="email">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="text-sm sm:text-[16px] md:text-[18px] text-[#131313] border border-[#616161] h-10 sm:h-12 rounded-[10px]"
                />
              </div>

              <div className="grid gap-2">
                <Label className="text-sm sm:text-[16px] md:text-[18px] text-[#131313] font-medium" htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                  className="text-sm sm:text-[16px] md:text-[18px] text-[#131313] border border-[#616161] h-10 sm:h-12 rounded-[10px]"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm sm:text-[14px]">Remember Me</Label>
                </div>
                <Link href="/forgot-password" className="text-sm sm:text-[14px] font-medium text-gray-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#D9AD5E] text-[#131313] text-sm sm:text-[16px] md:text-[18px] font-bold hover:bg-[#D9AD5E]/90 h-10 sm:h-12 rounded-[10px]"
              >
                Login
              </Button>

              <p className="text-sm sm:text-[14px] text-gray-600 text-center mt-4">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-sm sm:text-[14px] font-medium text-gray-600 hover:underline">
                  Sign Up
                </Link>
              </p>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}