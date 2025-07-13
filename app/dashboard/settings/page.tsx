"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Breadcrumb } from "../_components/breadcrumb";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Setting</h1>
        <Breadcrumb items={[{ label: "Dashboard" }, { label: "Setting" }]} />
      </div>

      <div className="space-y-4">
        <div>
          <Link href="/dashboard/settings/profile">
            <Card className="hover:bg-gray-50 cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Personal Information</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div>
          <Link href="/dashboard/settings/change-password">
            <Card className="hover:bg-gray-50 cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Change Password</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
