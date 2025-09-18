"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EmployeeProfile } from "@/lib/types";

type PersonalInformationFormProps = {
  profile: EmployeeProfile;
  onUpdate: (formData: Partial<EmployeeProfile>) => void;
  isUpdating?: boolean;
};

export default function PersonalInformationForm({
  profile,
  onUpdate,
  isUpdating = false,
}: PersonalInformationFormProps) {
  console.log('personal data',profile)
  const [formData, setFormData] = useState<Partial<EmployeeProfile>>({
    name: profile.name || "",
    companyAddress: profile.shop.companyName || "",
    email: profile.email || "",
    phone: profile.phone || "",
    country: profile.country || "",
    city: profile.city || "",
    roadOrArea: profile.roadOrArea || "",
    postalCode: profile.postalCode || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    onUpdate(formData);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">Personal Information</CardTitle>
        <Button
          className="bg-amber-400 text-amber-950 hover:bg-amber-500"
          onClick={handleSubmit}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update"}
        </Button>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={formData.name ?? ""} onChange={handleChange} />
        </div>
        {/* <div className="grid gap-2">
          <Label htmlFor="companyAddress">Company Address</Label>
          <Input
            id="companyAddress"
            value={formData?.shop?.companyName ?? ""}
            onChange={handleChange}
          />
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={formData.phone ?? ""} onChange={handleChange} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" value={formData.country ?? ""} onChange={handleChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" value={formData.city ?? ""} onChange={handleChange} />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="roadOrArea">Road/Area</Label>
          <Input id="roadOrArea" value={formData.roadOrArea ?? ""} onChange={handleChange} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input id="postalCode" value={formData.postalCode ?? ""} onChange={handleChange} />
        </div>
      </CardContent>
    </Card>
  );
}
