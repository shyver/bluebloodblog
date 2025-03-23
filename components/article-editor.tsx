"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { MarkdownEditor } from "@/components/markdown-editor"
import { Switch } from "@/components/ui/switch"

const articleFormSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters.",
    })
    .max(100, {
      message: "Title must not be longer than 100 characters.",
    }),
  slug: z
    .string()
    .min(5, {
      message: "Slug must be at least 5 characters.",
    })
    .max(100, {
      message: "Slug must not be longer than 100 characters.",
    })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must contain only lowercase letters, numbers, and hyphens.",
    }),
  excerpt: z
    .string()
    .max(160, {
      message: "Excerpt must not be longer than 160 characters.",
    })
    .optional(),
  content: z.string().min(50, {
    message: "Content must be at least 50 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  tags: z.string().optional(),
  featuredImage: z.string().optional(),
  autoCorrect: z.boolean().default(true),
  status: z.enum(["published", "draft"], {
    required_error: "Please select a status.",
  }),
})

type ArticleFormValues = z.infer<typeof articleFormSchema>

const defaultValues: Partial<ArticleFormValues> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  tags: "",
  featuredImage: "",
  autoCorrect: true,
  status: "draft",
}

export function ArticleEditor() {
  const [previewContent, setPreviewContent] = useState("")

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: ArticleFormValues) {
    toast({
      title: data.status === "published" ? "Article published" : "Draft saved",
      description: `Your article "${data.title}" has been ${
        data.status === "published" ? "published" : "saved as a draft"
      }.`,
    })
  }

  function generateSlug(title: string) {
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()

    form.setValue("slug", slug, { shouldValidate: true })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter article title"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      if (!form.getValues("slug")) {
                        generateSlug(e.target.value)
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>The title of your article. Keep it clear and engaging.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="enter-article-slug" {...field} />
                </FormControl>
                <FormDescription>The URL-friendly version of the title.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief summary of your article"
                  className="resize-none"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>A short summary that appears in article previews. Max 160 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="programming">Programming</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="writing">Writing</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>The main category for your article.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input placeholder="tag1, tag2, tag3" {...field} value={field.value || ""} />
                </FormControl>
                <FormDescription>Comma-separated tags to help categorize your article.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="featuredImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} value={field.value || ""} />
              </FormControl>
              <FormDescription>URL to the main image for your article.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="autoCorrect"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Auto Correct</FormLabel>
                <FormDescription>Enable automatic spelling and grammar correction while typing.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <Tabs defaultValue="editor" className="w-full">
                <TabsList className="mb-2">
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="editor">
                  <FormControl>
                    <MarkdownEditor
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value)
                        setPreviewContent(value)
                      }}
                    />
                  </FormControl>
                </TabsContent>
                <TabsContent value="preview">
                  <div className="min-h-[300px] rounded-md border border-input bg-background p-4">
                    <div className="prose dark:prose-invert max-w-none">
                      {/* In a real app, you would render Markdown here */}
                      <div dangerouslySetInnerHTML={{ __html: previewContent.replace(/\n/g, "<br />") }} />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <FormDescription>Write your article content using Markdown.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Set as draft to save without publishing.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.setValue("status", "draft")
              form.handleSubmit(onSubmit)()
            }}
          >
            Save as Draft
          </Button>
          <Button
            type="button"
            onClick={() => {
              form.setValue("status", "published")
              form.handleSubmit(onSubmit)()
            }}
          >
            Publish
          </Button>
        </div>
      </form>
    </Form>
  )
}

