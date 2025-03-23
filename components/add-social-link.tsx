"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  detectSocialPlatform,
  getSocialPlatformName,
  type SocialPlatform,
  type DetectedSocialLink,
} from "@/lib/social-utils"
import { Facebook, Github, Globe, Instagram, Linkedin, Twitter, Youtube, LinkIcon, Plus, X } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

interface AddSocialLinkProps {
  onAddLink: (platform: SocialPlatform, url: string) => void
  existingUrls: Record<string, string | undefined>
}

export function AddSocialLink({ onAddLink, existingUrls }: AddSocialLinkProps) {
  const [url, setUrl] = useState("")
  const [detectedLink, setDetectedLink] = useState<DetectedSocialLink | null>(null)

  // Helper function to get the appropriate icon component
  const getIconComponent = (platform: SocialPlatform) => {
    switch (platform) {
      case "website":
        return <Globe className="h-4 w-4" />
      case "twitter":
        return <Twitter className="h-4 w-4" />
      case "facebook":
        return <Facebook className="h-4 w-4" />
      case "instagram":
        return <Instagram className="h-4 w-4" />
      case "linkedin":
        return <Linkedin className="h-4 w-4" />
      case "github":
        return <Github className="h-4 w-4" />
      case "youtube":
        return <Youtube className="h-4 w-4" />
      default:
        return <LinkIcon className="h-4 w-4" />
    }
  }

  const handleDetect = () => {
    if (!url.trim()) {
      toast({
        title: "Empty URL",
        description: "Please enter a URL to detect",
        variant: "destructive",
      })
      return
    }

    const detected = detectSocialPlatform(url)

    if (detected.platform === "unknown") {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL",
        variant: "destructive",
      })
      return
    }

    // Check if this platform already exists
    if (existingUrls[detected.platform]) {
      toast({
        title: "Platform already exists",
        description: `You already have a ${getSocialPlatformName(detected.platform)} link. Please edit the existing one.`,
        variant: "destructive",
      })
      return
    }

    setDetectedLink(detected)
  }

  const handleAddLink = () => {
    if (!detectedLink) return

    onAddLink(detectedLink.platform, detectedLink.normalizedUrl)
    setUrl("")
    setDetectedLink(null)

    toast({
      title: "Link added",
      description: `Your ${getSocialPlatformName(detectedLink.platform)} link has been added.`,
    })
  }

  const handleCancel = () => {
    setDetectedLink(null)
    setUrl("")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="social-url">Add Social Link</Label>
        <div className="flex gap-2">
          <Input
            id="social-url"
            placeholder="Enter URL (e.g., https://twitter.com/username)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={!!detectedLink}
          />
          {!detectedLink ? (
            <Button type="button" onClick={handleDetect}>
              Detect
            </Button>
          ) : (
            <Button type="button" variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {detectedLink && (
        <div className="rounded-md border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getIconComponent(detectedLink.platform)}
              <span className="font-medium">{getSocialPlatformName(detectedLink.platform)}</span>
              <Badge variant="outline" className="ml-2">
                Detected
              </Badge>
            </div>
            <Button size="sm" onClick={handleAddLink}>
              <Plus className="mr-2 h-4 w-4" />
              Add Link
            </Button>
          </div>
          <p className="mt-2 text-sm text-muted-foreground break-all">{detectedLink.normalizedUrl}</p>
        </div>
      )}
    </div>
  )
}

