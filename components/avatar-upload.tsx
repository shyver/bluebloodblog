"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Upload } from "lucide-react"

export function AvatarUpload() {
  const [avatar, setAvatar] = useState<string>("/placeholder-user.jpg")
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string)
          toast({
            title: "Avatar updated",
            description: "Your profile picture has been updated successfully.",
          })
        }
      }
      reader.readAsDataURL(file)
      setIsUploading(false)
    }, 1500)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={avatar} alt="Avatar" />
            <AvatarFallback>BB</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="avatar-upload">
              <Button
                variant="outline"
                className="cursor-pointer"
                disabled={isUploading}
                onClick={() => document.getElementById("avatar-upload")?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                {isUploading ? "Uploading..." : "Upload Avatar"}
              </Button>
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size 2MB.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

