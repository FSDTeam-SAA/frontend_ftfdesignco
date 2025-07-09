"use client"

import type React from "react"
import { useState, useCallback, useRef } from "react"
import Image from "next/image"
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { UploadCloud, MapPin } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { useSession } from "next-auth/react" // Assuming NextAuth.js for session management

export function CreateStoreModal() {
  const [companyUniqueId, setCompanyUniqueId] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [companyAddress, setCompanyAddress] = useState("")
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)

  const logoInputRef = useRef<HTMLInputElement>(null)
  const bannerInputRef = useRef<HTMLInputElement>(null)

  // Get session data (assuming NextAuth.js)
  const { data: session } = useSession()
  const token = session?.accessToken
 

  // Mutation for posting form data
  const createStoreMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shop/create`, {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }), // Include token if available
        },
        body: formData,
      })
      if (!response.ok) {
        throw new Error("Failed to create store")
      }
      return response.json()
    },
    onSuccess: (data) => {
      console.log("Store created successfully:", data)
      // Reset form or close modal here if needed
      setCompanyUniqueId("")
      setCompanyName("")
      setCompanyAddress("")
      setLogoFile(null)
      setBannerFile(null)
      setLogoPreview(null)
      setBannerPreview(null)
    },
    onError: (error) => {
      console.error("Error creating store:", error)
      // Handle error (e.g., show error message to user)
    },
  })

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, setPreview: React.Dispatch<React.SetStateAction<string | null>>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
      const file = event.target.files?.[0]
      if (file) {
        setFile(file)
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        setFile(null)
        setPreview(null)
      }
    },
    [],
  )

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>, setPreview: React.Dispatch<React.SetStateAction<string | null>>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
      event.preventDefault()
      event.stopPropagation()
      const file = event.dataTransfer.files?.[0]
      if (file) {
        setFile(file)
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        setFile(null)
        setPreview(null)
      }
    },
    [],
  )

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }, [])

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }, [])

  const handleConfirm = () => {
    const formData = new FormData()
    formData.append("data", JSON.stringify({
      companyId: companyUniqueId,
      companyName: companyName,
      comapnyAddress: companyAddress, // Note: keeping the typo as specified
    }))
    if (logoFile) {
      formData.append("companyLogo", logoFile)
    }
    if (bannerFile) {
      formData.append("companyBanner", bannerFile)
    }

    createStoreMutation.mutate(formData)
  }

  return (
    <DialogContent className="sm:max-w-[900px] h-[800px] overflow-y-auto !rounded-xl bg-white">
      <div className="text-center py-2 text-base font-medium text-[#EFA610] pt-[30px]">
        Get more from your swag Platform
      </div>
      <DialogHeader className="px-6 pt-1 pb-4">
        <DialogTitle className="text-2xl font-bold text-center">
          <h2 className="text-[48px] text-[#131313] font-bold"> Create New Swag Store</h2>        
        </DialogTitle>
        <DialogDescription className="pt-[48px]">
          <h2 className="text-[32px] text-[#131313] font-bold">
            Your company details
          </h2>
          <p className="text-base text-[#424242] mt-2">Please enter details of your company</p>
        </DialogDescription>
      </DialogHeader>
      <div className="px-6 pb-6 space-y-6">
        <div className="space-y-2">
          <Label className="text-[18px] text-[#131313] font-normal" htmlFor="company-unique-id">Company Unique Id</Label>
          <Input
            id="company-unique-id"
            placeholder="Enter your company id"
            value={companyUniqueId}
            onChange={(e) => setCompanyUniqueId(e.target.value)}
            className="h-[50px] rounded-[10px]"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[18px] text-[#131313] font-normal" htmlFor="company-name">Company Name</Label>
          <Input
            id="company-name"
            placeholder="Enter your company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="h-[50px] rounded-[10px]"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[18px] text-[#131313] font-normal" htmlFor="company-address">Company Address</Label>
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

        {/* Company Logo Upload */}
        <div className="space-y-2">
          <Label className="text-[18px] text-[#131313] font-normal">Company Logo</Label>
          <div
            className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors relative overflow-hidden"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, setLogoPreview, setLogoFile)}
            onClick={() => logoInputRef.current?.click()}
          >
            {logoPreview ? (
              <Image
                src={logoPreview || "/placeholder.svg"}
                alt="Company Logo Preview"
                layout="fill"
                objectFit="contain"
                className="p-2"
              />
            ) : (
              <>
                <UploadCloud className="h-8 w-8 text-gray-400" />
                <p className="text-sm text-gray-500 mt-2">Add Logo</p>
                <p className="text-xs text-gray-400">Drag and drop images here or click to upload files</p>
              </>
            )}
            <input
              type="file"
              ref={logoInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setLogoPreview, setLogoFile)}
            />
          </div>
        </div>

        {/* Company Banner Upload */}
        <div className="space-y-2">
          <Label className="text-[18px] text-[#131313] font-normal">Company Banner</Label>
          <div
            className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors relative overflow-hidden"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, setBannerPreview, setBannerFile)}
            onClick={() => bannerInputRef.current?.click()}
          >
            {bannerPreview ? (
              <Image
                src={bannerPreview || "/placeholder.svg"}
                alt="Company Banner Preview"
                layout="fill"
                objectFit="contain"
                className="p-2"
              />
            ) : (
              <>
                <UploadCloud className="h-8 w-8 text-gray-400" />
                <p className="text-sm text-gray-500 mt-2">Add Banner</p>
                <p className="text-xs text-gray-400">Drag and drop images here or click to upload files</p>
              </>
            )}
            <input
              type="file"
              ref={bannerInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setBannerPreview, setBannerFile)}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#D9AD5E] hover:bg-[#D9AD5E]/90 text-white py-2 rounded-[10px] h-[50px]"
          onClick={handleConfirm}
          disabled={createStoreMutation.isPending || !session} // Disable if no session
        >
          {createStoreMutation.isPending ? "Submitting..." : "Confirm"}
        </Button>
      </div>
    </DialogContent>
  )
}