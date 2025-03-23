"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { AvatarUpload } from "@/components/avatar-upload"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Add the social media icons import
import { Facebook, Github, Globe, Instagram, Linkedin, Twitter, Youtube, Trash2 } from "lucide-react"

// Import the social links components
import { SocialLinksDisplay } from "@/components/social-links-display"
import { AddSocialLink } from "@/components/add-social-link"
import type { SocialPlatform } from "@/lib/social-utils"

// Update the profileFormSchema to include more social platforms
const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z.string().min(1, { message: "This field is required" }).email("This is not a valid email."),
  bio: z.string().max(160).min(4),
  urls: z.record(z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal(""))).optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// Update the defaultValues to include the new social platforms
const defaultValues: Partial<ProfileFormValues> = {
  username: "blueblooded",
  email: "admin@blueblog.com",
  bio: "I'm the admin of BlueBlood Blog, a platform for sharing thoughts and ideas.",
  urls: {
    twitter: "https://twitter.com/blueblooded",
    facebook: "https://facebook.com/blueblooded",
    instagram: "https://instagram.com/blueblooded",
    linkedin: "https://linkedin.com/in/blueblooded",
    github: "https://github.com/blueblooded",
    youtube: "https://youtube.com/c/blueblooded",
    website: "https://blueblog.com",
  },
}

export default function ProfilePage() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  // Get the current URLs from the form
  const urls = form.watch("urls") || {}

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    })
  }

  // Function to add a new social link
  const handleAddSocialLink = (platform: SocialPlatform, url: string) => {
    const currentUrls = form.getValues("urls") || {}
    form.setValue(
      "urls",
      {
        ...currentUrls,
        [platform]: url,
      },
      { shouldValidate: true },
    )
  }

  // Function to remove a social link
  const handleRemoveSocialLink = (platform: string) => {
    const currentUrls = { ...form.getValues("urls") } || {}
    delete currentUrls[platform]
    form.setValue("urls", currentUrls, { shouldValidate: true })

    toast({
      title: "Link removed",
      description: `Your ${platform} link has been removed.`,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and profile information.</p>
      </div>
      <div className="grid gap-10 md:grid-cols-[1fr_250px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="blueblooded" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name. It can be your real name or a pseudonym.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="admin@blueblog.com" {...field} />
                  </FormControl>
                  <FormDescription>We&apos;ll never share your email with anyone else.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us a little bit about yourself" className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>
                    You can <span>@mention</span> other users and organizations.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
                <CardDescription>Connect your social media accounts to your profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Smart link detection */}
                <AddSocialLink onAddLink={handleAddSocialLink} existingUrls={urls} />

                <Separator />

                {/* Display existing links with remove option */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Your Social Links</h4>

                  {Object.keys(urls).length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No social links added yet. Add your first link above.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {Object.entries(urls).map(([platform, url]) => {
                        if (!url) return null

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
                              return null
                          }
                        }

                        const platformName = platform.charAt(0).toUpperCase() + platform.slice(1)

                        return (
                          <div key={platform} className="flex items-center justify-between rounded-md border p-3">
                            <div className="flex items-center gap-2">
                              {getIconComponent(platform)}
                              <span className="font-medium">{platformName}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-muted-foreground max-w-[200px] truncate">{url}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveSocialLink(platform)}
                                className="h-8 w-8 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove {platformName}</span>
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Button type="submit">Update profile</Button>
          </form>
        </Form>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Avatar</h3>
            <p className="text-sm text-muted-foreground">Upload your profile picture</p>
          </div>
          <AvatarUpload />

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Social Profiles</h3>
            <p className="text-sm text-muted-foreground">Your public social media profiles</p>
            <Card className="p-4">
              {Object.keys(urls).length === 0 ? (
                <p className="text-sm text-muted-foreground">No social links added yet.</p>
              ) : (
                <SocialLinksDisplay urls={urls} className="mt-2" />
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

