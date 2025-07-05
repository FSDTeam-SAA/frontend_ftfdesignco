// types/next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken: string
    user: {
      _id: string
      name: string
      email: string
      role: string
      image?: string | null
      isVerified: boolean
      isShopCreated: boolean
      employeeCount: number
      shop: string
      isPaid: boolean
      createdAt: string
      updatedAt: string
    }
  }

  interface User {
    accessToken: string
    _id: string
    name: string
    email: string
    role: string
    image?: string | null
    isVerified: boolean
    isShopCreated: boolean
    employeeCount: number
    shop: string
    createdAt: string
    updatedAt: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string
    user: Session["user"]
  }
}
