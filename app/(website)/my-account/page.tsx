"use client";

import { useState } from "react";
import { User, Lock, List, Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import PersonalInformationForm from "@/components/web_components/personal-information-form";
import ChangePasswordForm from "@/components/web_components/change-password-form";
import OrdersPage from "../order-history/page";
import ShopNavbar from "@/components/shared/shopnavbar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeprofile, updateEmployeeProfile } from "@/lib/api";
import { toast } from "sonner";
import { EmployeeProfile } from "@/lib/types";

export default function AccountsPage() {
  const [activeTab, setActiveTab] = useState("personal-information");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  // Fetch profile
  const { data: profile, isLoading } = useQuery<EmployeeProfile>({
    queryKey: ["userProfile"],
    queryFn: employeeprofile,
  });

  // Update profile mutation
  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: ({
      formData,
      imageFile,
    }: {
      formData: Partial<EmployeeProfile>;
      imageFile?: File | null;
    }) => updateEmployeeProfile(formData, imageFile),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile ");
    },
  });

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && profile) {
      const file = e.target.files[0];
      setImageFile(file);
      queryClient.setQueryData(["userProfile"], {
        ...profile,
        imageUrl: URL.createObjectURL(file),
      });
    }
  };

  if (isLoading || !profile)
    return <p className="text-center py-10">Loading...</p>;
  console.log("profile data", profile);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <ShopNavbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Accounts</h1>
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
          {/* Left Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Profile Card */}
            <Card className="p-6 flex flex-col items-center text-center relative">
              <div className="relative">
                <Avatar className="w-24 h-24 mb-4 border-2 border-gray-200">
                  <AvatarImage
                    src={profile.imageLink || "/placeholder-user.jpg"}
                    alt={profile.name}
                  />

                  <AvatarFallback>{profile.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
                {/* Pencil Icon for Image Change */}
                <label className="absolute bottom-3 right-2 bg-white p-1 rounded-full shadow cursor-pointer">
                  <Pencil className="w-4 h-4 text-gray-600" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              <h2 className="text-lg font-semibold">{profile.name}</h2>
              <p className="text-sm text-gray-500">{profile.email}</p>
              <p className="text-sm text-gray-500 mt-2">
                ID: <span className="font-medium">{profile.employeeId}</span>
              </p>
              <p className="text-sm text-gray-500">
                Co ID :{" "}
                <span className="font-medium text-orange-600">
                  {profile.coin}
                </span>
              </p>
            </Card>

            {/* Navigation */}
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                className={cn(
                  "justify-start px-4 py-2 text-base",
                  activeTab === "personal-information" &&
                    "bg-gray-100 text-gray-900 font-semibold"
                )}
                onClick={() => setActiveTab("personal-information")}
              >
                <User className="w-5 h-5 mr-3" />
                Personal Information
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "justify-start px-4 py-2 text-base",
                  activeTab === "change-password" &&
                    "bg-gray-100 text-gray-900 font-semibold"
                )}
                onClick={() => setActiveTab("change-password")}
              >
                <Lock className="w-5 h-5 mr-3" />
                Change Password
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "justify-start px-4 py-2 text-base",
                  activeTab === "order-history" &&
                    "bg-gray-100 text-gray-900 font-semibold"
                )}
                onClick={() => setActiveTab("order-history")}
              >
                <List className="w-5 h-5 mr-3" />
                Order History
              </Button>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1">
            {activeTab === "personal-information" && (
              <PersonalInformationForm
                profile={profile}
                onUpdate={(formData) => updateProfile({ formData, imageFile })}
                isUpdating={isPending}
              />
            )}
            {activeTab === "change-password" && <ChangePasswordForm />}
            {activeTab === "order-history" && <OrdersPage />}
          </div>
        </div>
      </div>
    </div>
  );
}
