import { Facebook, Github, Globe, Instagram, Linkedin, Twitter, Youtube, LinkIcon } from "lucide-react"
import Link from "next/link"
import { getSocialPlatformColor, type SocialPlatform } from "@/lib/social-utils"

interface SocialLinksDisplayProps {
  urls: {
    website?: string
    twitter?: string
    facebook?: string
    instagram?: string
    linkedin?: string
    github?: string
    youtube?: string
    [key: string]: string | undefined
  }
  className?: string
}

export function SocialLinksDisplay({ urls, className = "" }: SocialLinksDisplayProps) {
  // Helper function to get the appropriate icon component
  const getIconComponent = (platform: string) => {
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

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {Object.entries(urls).map(([platform, url]) => {
        if (!url) return null

        const platformKey = platform as SocialPlatform
        const colorClass = getSocialPlatformColor(platformKey)
        const platformName = platform.charAt(0).toUpperCase() + platform.slice(1)

        return (
          <Link
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-full bg-muted p-2 text-muted-foreground transition-colors ${colorClass}`}
            title={platformName}
          >
            {getIconComponent(platform)}
            <span className="sr-only">{platformName}</span>
          </Link>
        )
      })}
    </div>
  )
}

