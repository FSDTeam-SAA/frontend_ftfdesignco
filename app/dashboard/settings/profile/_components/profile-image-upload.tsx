"use client";

import type React from "react";

import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { useUploadProfileImage } from "@/hooks/use-profile-api";

interface ProfileImageUploadProps {
  currentImage?: string | null;
  userName: string;
  token: string;
}

export function ProfileImageUpload({
  currentImage,
  userName,
  token,
}: ProfileImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const uploadImage = useUploadProfileImage(token);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload the file
      uploadImage.mutate(file, {
        onSuccess: () => {
          setPreviewImage(null);
        },
        onError: () => {
          setPreviewImage(null);
        },
      });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const displayImage = previewImage || currentImage;

  return (
    <div className="relative ">
      <div className="flex items-center justify-center gap-4">
        <div>
          <div
            className="relative group cursor-pointer"
            onClick={handleImageClick}
          >
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={displayImage || "/placeholder.svg?height=80&width=80"}
                alt={userName}
              />
              <AvatarFallback>{getInitials(userName)}</AvatarFallback>
            </Avatar>

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="h-6 w-6 text-white" />
            </div>

            {/* Loading overlay */}
            {uploadImage.isPending && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
