"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import AuthLayout from "@/components/web_components/AuthLayout"

export default function LoginPage() {
  const router = useRouter()

  return (
    <AuthLayout>
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome 👋</CardTitle>
          <CardDescription>Please login here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="Enter your email address" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" placeholder="Enter your password" required />
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" />
                <Label htmlFor="remember-me">Remember Me</Label>
              </div>
              <Button
                variant="link"
                className="p-0 h-auto text-sm text-muted-foreground hover:text-primary"
                onClick={() => router.push("/forgot-password")}
              >
                Forgot Password?
              </Button>
            </div>
            <Button type="submit" className="w-full bg-gratisswag-gold hover:bg-gratisswag-gold-hover">
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Button variant="link" className="p-0 h-auto text-sm underline" onClick={() => router.push("/signup")}>
              Sign Up
            </Button>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
