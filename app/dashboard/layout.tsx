"use client"

import type React from "react"
import "../globals.css";

import { QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import { Sidebar } from "./_components/sidebar"
import { DashboardHeader } from "./_components/dashboardHeader"
import { queryClient } from "@/lib/query-client"



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <div className="min-h-screen bg-gray-50">
              <Sidebar />
              <div className="lg:pl-64">
                <DashboardHeader />
                <main className="p-6">{children}</main>
              </div>
            </div>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
