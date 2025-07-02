// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Card, CardContent } from "@/components/ui/card"


// export default function CompanyLoginPage() {
//   const router = useRouter()
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     rememberMe: false,
//   })

//   const handleInputChange = (field: string, value: string | boolean) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     console.log("Company Login submitted:", formData)
//     // Simulate login success and redirect
//     router.push("/") // Redirect to dashboard or home page
//   }

//   return (
//     <Card className="w-full max-w-md bg-white shadow-lg">
//       <CardContent className="p-8">
//         <div className="mb-6">
//           <h2 className="text-xl font-medium text-gray-800 mb-1">Welcome 👋</h2>
//           <p className="text-sm text-gray-600">Please login here</p>
//         </div>

//         <div className="lg:hidden mb-6">
//           {/* <GiftBoxLogo /> */}
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label htmlFor="email" className="text-sm font-medium text-gray-700">
//               Email Address
//             </Label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="Enter your email address"
//               value={formData.email}
//               onChange={(e) => handleInputChange("email", e.target.value)}
//               className="mt-1"
//               required
//             />
//           </div>

//           <div>
//             <Label htmlFor="password" className="text-sm font-medium text-gray-700">
//               Password
//             </Label>
//             <Input
//               id="password"
//               type="password"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={(e) => handleInputChange("password", e.target.value)}
//               className="mt-1"
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
//               <Label htmlFor="remember" className="text-sm text-gray-600">
//                 Remember Me
//               </Label>
//             </div>
//             <button
//               type="button"
//               onClick={() => router.push("/forgot-password")}
//               className="text-sm text-blue-600 hover:underline"
//             >
//               Forgot Password?
//             </button>
//           </div>

//           <Button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 mt-6">
//             Login
//           </Button>
//         </form>

//         <p className="text-sm text-gray-600 text-center mt-6">
//           {"Don't have an account? "}
//           <button onClick={() => router.push("/signup")} className="text-blue-600 hover:underline">
//             Sign Up
//           </button>
//         </p>
//       </CardContent>
//     </Card>
//   )
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

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

    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (res?.ok) {
      toast.success("Login successful!");
      router.push("/"); 
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <Card className="w-full max-w-md bg-white shadow-lg">
      <CardContent className="p-8">
        <div className="mb-6">
          <h2 className="text-xl font-medium text-gray-800 mb-1">Welcome 👋</h2>
          <p className="text-sm text-gray-600">Please login here</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
              />
              <Label htmlFor="remember">Remember Me</Label>
            </div>
            <button
              type="button"
              onClick={() => router.push("/forgot-password")}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <Button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 mt-6"
          >
            Login
          </Button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          Don&apos;t have an account?{" "}
          <button onClick={() => router.push("/signup")} className="text-blue-600 hover:underline">
            Sign Up
          </button>
        </p>
      </CardContent>
    </Card>
  );
}
