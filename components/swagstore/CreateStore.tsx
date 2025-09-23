"use client";

import type React from "react";
import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UploadCloud, MapPin } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export function CreateStore() {
  const [companyUniqueId, setCompanyUniqueId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const { data: session } = useSession();
  const token = session?.accessToken;

  const createStoreMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/shop/create`,
        {
          method: "POST",
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: formData,
        }
      );

      return response.json();
    },
    onSuccess: (data) => {
      setCompanyUniqueId("");
      setCompanyName("");
      setCompanyAddress("");
      setLogoFile(null);
      setBannerFile(null);
      setLogoPreview(null);
      setBannerPreview(null);
      toast.success(`${data.message}`);
    },
    onError: (error) => {
      toast.error(`${error}`);
      console.error("Error creating store:", error);
    },
  });

  const handleFileChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      setPreview: React.Dispatch<React.SetStateAction<string | null>>,
      setFile: React.Dispatch<React.SetStateAction<File | null>>
    ) => {
      const file = event.target.files?.[0];
      if (file) {
        setFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setFile(null);
        setPreview(null);
      }
    },
    []
  );

  const handleDrop = useCallback(
    (
      event: React.DragEvent<HTMLDivElement>,
      setPreview: React.Dispatch<React.SetStateAction<string | null>>,
      setFile: React.Dispatch<React.SetStateAction<File | null>>
    ) => {
      event.preventDefault();
      event.stopPropagation();
      const file = event.dataTransfer.files?.[0];
      if (file) {
        setFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const handleConfirm = () => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        companyId: companyUniqueId,
        companyName: companyName,
        comapnyAddress: companyAddress, // keeping typo as given
      })
    );
    if (logoFile) formData.append("companyLogo", logoFile);
    if (bannerFile) formData.append("companyBanner", bannerFile);

    createStoreMutation.mutate(formData);
  };

  return (
    <section id="swagecreatestore">
      <div className="container mx-auto py-[40px] md:py-[72px]">
        <Card className="max-w-[900px] mx-auto h-auto overflow-y-auto rounded-xl bg-white shadow-md">
          <CardHeader className="text-center">
            <CardTitle className="text-[48px] text-[#131313] font-bold">
              Create New Swag Store
            </CardTitle>
            <CardDescription className="pt-4">
              <h2 className="text-[28px] text-[#131313] font-bold">
                Your company details
              </h2>
              <p className="text-base text-[#424242] mt-2">
                Please enter details of your company
              </p>
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-6 space-y-6">
            {/* Company Unique Id */}
            <div className="space-y-2">
              <Label htmlFor="company-unique-id">Company Unique Id</Label>
              <Input
                id="company-unique-id"
                placeholder="Enter your company id"
                value={companyUniqueId}
                onChange={(e) => setCompanyUniqueId(e.target.value)}
                className="h-[50px] rounded-[10px]"
              />
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                placeholder="Enter your company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="h-[50px] rounded-[10px]"
              />
            </div>

            {/* Company Address */}
            <div className="space-y-2">
              <Label htmlFor="company-address">Company Address</Label>
              <div className="relative">
                <Input
                  id="company-address"
                  placeholder="Enter your company address"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  className="pr-10 h-[50px] rounded-[10px]"
                />
                <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Logo Upload */}
            <div className="space-y-2">
              <Label>Company Logo</Label>
              <div
                className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 relative overflow-hidden"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, setLogoPreview, setLogoFile)}
                onClick={() => logoInputRef.current?.click()}
              >
                {logoPreview ? (
                  <Image
                    src={logoPreview}
                    alt="Company Logo Preview"
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <>
                    <UploadCloud className="h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-500 mt-2">Add Logo</p>
                    <p className="text-xs text-gray-400">
                      Drag & drop or click to upload
                    </p>
                  </>
                )}
                <input
                  type="file"
                  ref={logoInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange(e, setLogoPreview, setLogoFile)
                  }
                />
              </div>
            </div>

            {/* Banner Upload */}
            <div className="space-y-2">
              <Label>Company Banner</Label>
              <div
                className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 relative overflow-hidden"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, setBannerPreview, setBannerFile)}
                onClick={() => bannerInputRef.current?.click()}
              >
                {bannerPreview ? (
                  <Image
                    src={bannerPreview}
                    alt="Company Banner Preview"
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <>
                    <UploadCloud className="h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-500 mt-2">Add Banner</p>
                    <p className="text-xs text-gray-400">
                      Drag & drop or click to upload
                    </p>
                  </>
                )}
                <input
                  type="file"
                  ref={bannerInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange(e, setBannerPreview, setBannerFile)
                  }
                />
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-[#D9AD5E] hover:bg-[#D9AD5E]/90 text-white py-2 rounded-[10px] h-[50px]"
              onClick={handleConfirm}
              disabled={createStoreMutation.isPending || !session}
            >
              {createStoreMutation.isPending ? "Submitting..." : "Confirm"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
