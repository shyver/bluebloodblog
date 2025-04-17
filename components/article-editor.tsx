"use client"

import {useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

import dynamic from "next/dynamic"
const 
BlockNote= dynamic(() => import('./blocknote'), { ssr: false });

const articleFormSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters.",
    })
    .max(100, {
      message: "Title must not be longer than 100 characters.",
    }),
  content: z.string().optional(),
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
  content: "",
  tags: "",
  featuredImage: "",
  autoCorrect: true,
  status: "draft",
}

export function ArticleEditor() {
  const blockNoteRef = useRef<any>(null);
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

  // function generateSlug(title: string) {
  //   const slug = title
  //     .toLowerCase()
  //     .replace(/[^\w\s-]/g, "")
  //     .replace(/\s+/g, "-")
  //     .replace(/-+/g, "-")
  //     .trim()

  //   form.setValue("slug", slug, { shouldValidate: true })
  // }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col lg:flex-row">
      <div className="flex flex-col w-full gap-6">
      <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        blockNoteRef.current?.focus();
                      }
                    }}
                    placeholder="Enter article title"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                    }} className=" !text-[50px] border-none focus:border-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none shadow-none h-20"
/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
  control={form.control}
  name="content"
  render={() => (
    <FormItem>
          <FormControl>
            {/* <MarkdownEditor
              value={field.value}
              onChange={(value) => {
                field.onChange(value)
                setPreviewContent(value)
              }}
            /> */}
            <BlockNote ref={blockNoteRef} formSetValue={form.setValue} />
          </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


  </div>
        <div className="flex flex-col gap-2">
          
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
        </div>
          
      </form>
    </Form>
  )
}

