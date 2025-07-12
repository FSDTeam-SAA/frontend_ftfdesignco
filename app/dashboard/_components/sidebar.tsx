"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Package,
  History,
  Users,
  FileText,
  DollarSign,
  Coins,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Products List",
    icon: Package,
    children: [
      { name: "List", href: "/dashboard/products/list" },
      { name: "Status", href: "/dashboard/products/status" },
    ],
  },
  {
    name: "Order History",
    href: "/dashboard/orders",
    icon: History,
  },
  {
    name: "Employee Profile",
    href: "/dashboard/employees",
    icon: Users,
  },
  {
    name: "Requested for Products",
    href: "/requests",
    icon: FileText,
  },
  {
    name: "My Sales",
    href: "/dashboard/sales",
    icon: DollarSign,
  },
  {
    name: "Company Coins",
    href: "/dashboard/coins",
    icon: Coins,
  },
  {
    name: "Setting",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>(["Products List"])
  const pathname = usePathname()

  const toggleExpanded = (name: string) => {
    setExpandedItems((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]))
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-[#1e5a6b] text-white">
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-orange-500 flex items-center justify-center">
            <Package className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-orange-400">GrabSwag</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isExpanded = expandedItems.includes(item.name)
          const isActive = item.href ? pathname === item.href : false
          const hasActiveChild = item.children?.some((child) => pathname === child.href)

          if (item.children) {
            return (
              <div key={item.name}>
                <button
                  onClick={() => toggleExpanded(item.name)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isExpanded || hasActiveChild
                      ? "bg-[#2a6b7d] text-white"
                      : "text-gray-300 hover:bg-[#2a6b7d] hover:text-white",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </div>
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
                {isExpanded && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={cn(
                          "block px-3 py-2 text-sm rounded-md transition-colors",
                          pathname === child.href
                            ? "bg-orange-500 text-white"
                            : "text-gray-300 hover:bg-[#2a6b7d] hover:text-white",
                        )}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          return (
            <Link
              key={item.name}
              href={item.href!}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive ? "bg-orange-500 text-white" : "text-gray-300 hover:bg-[#2a6b7d] hover:text-white",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-gray-300 hover:bg-[#2a6b7d] hover:text-white"
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-white shadow-md"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <SidebarContent />
      </div>

      {/* Mobile sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  )
}
