// Utility functions for social media link detection and management

type SocialPlatform = "twitter" | "facebook" | "instagram" | "linkedin" | "github" | "youtube" | "website" | "unknown"

interface DetectedSocialLink {
  platform: SocialPlatform
  url: string
  normalizedUrl: string
}

/**
 * Detects the social media platform from a URL
 */
export function detectSocialPlatform(url: string): DetectedSocialLink {
  // Ensure URL has a protocol
  let normalizedUrl = url
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    normalizedUrl = `https://${url}`
  }

  try {
    const urlObj = new URL(normalizedUrl)
    const hostname = urlObj.hostname.toLowerCase()

    // Check for common social media domains
    if (hostname.includes("twitter.com") || hostname.includes("x.com")) {
      return { platform: "twitter", url, normalizedUrl }
    } else if (hostname.includes("facebook.com") || hostname.includes("fb.com")) {
      return { platform: "facebook", url, normalizedUrl }
    } else if (hostname.includes("instagram.com")) {
      return { platform: "instagram", url, normalizedUrl }
    } else if (hostname.includes("linkedin.com")) {
      return { platform: "linkedin", url, normalizedUrl }
    } else if (hostname.includes("github.com")) {
      return { platform: "github", url, normalizedUrl }
    } else if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
      return { platform: "youtube", url, normalizedUrl }
    } else {
      // If no specific platform is detected, consider it a website
      return { platform: "website", url, normalizedUrl }
    }
  } catch (error) {
    // If URL parsing fails, return unknown
    return { platform: "unknown", url, normalizedUrl: url }
  }
}

/**
 * Gets the appropriate icon name for a social platform
 */
export function getSocialPlatformIcon(platform: SocialPlatform): string {
  switch (platform) {
    case "twitter":
      return "Twitter"
    case "facebook":
      return "Facebook"
    case "instagram":
      return "Instagram"
    case "linkedin":
      return "Linkedin"
    case "github":
      return "Github"
    case "youtube":
      return "Youtube"
    case "website":
      return "Globe"
    default:
      return "Link"
  }
}

/**
 * Gets a user-friendly name for a social platform
 */
export function getSocialPlatformName(platform: SocialPlatform): string {
  switch (platform) {
    case "twitter":
      return "Twitter"
    case "facebook":
      return "Facebook"
    case "instagram":
      return "Instagram"
    case "linkedin":
      return "LinkedIn"
    case "github":
      return "GitHub"
    case "youtube":
      return "YouTube"
    case "website":
      return "Website"
    default:
      return "Unknown"
  }
}

/**
 * Gets the color class for a social platform
 */
export function getSocialPlatformColor(platform: SocialPlatform): string {
  switch (platform) {
    case "twitter":
      return "hover:bg-blue-500 hover:text-white"
    case "facebook":
      return "hover:bg-blue-600 hover:text-white"
    case "instagram":
      return "hover:bg-pink-600 hover:text-white"
    case "linkedin":
      return "hover:bg-blue-700 hover:text-white"
    case "github":
      return "hover:bg-gray-900 hover:text-white"
    case "youtube":
      return "hover:bg-red-600 hover:text-white"
    case "website":
      return "hover:bg-green-600 hover:text-white"
    default:
      return "hover:bg-gray-500 hover:text-white"
  }
}

export type { SocialPlatform, DetectedSocialLink }

