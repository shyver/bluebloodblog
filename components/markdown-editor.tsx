"use client"

import type React from "react"

import { useState } from "react"
import { Bold, Italic, Link, List, ListOrdered, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [selectionStart, setSelectionStart] = useState(0)
  const [selectionEnd, setSelectionEnd] = useState(0)

  const handleTextareaSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement
    setSelectionStart(target.selectionStart)
    setSelectionEnd(target.selectionEnd)
  }

  const insertMarkdown = (markdownBefore: string, markdownAfter = "") => {
    const newValue =
      value.substring(0, selectionStart) +
      markdownBefore +
      value.substring(selectionStart, selectionEnd) +
      markdownAfter +
      value.substring(selectionEnd)

    onChange(newValue)
  }

  const formatBold = () => insertMarkdown("**", "**")
  const formatItalic = () => insertMarkdown("*", "*")
  const formatLink = () => {
    const selectedText = value.substring(selectionStart, selectionEnd)
    if (selectedText) {
      insertMarkdown("[", "](url)")
    } else {
      insertMarkdown("[text](url)")
    }
  }
  const formatQuote = () => insertMarkdown("> ")
  const formatBulletList = () => insertMarkdown("- ")
  const formatNumberedList = () => insertMarkdown("1. ")

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 rounded-t-md border border-input bg-muted p-1">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={formatBold}>
                <Bold className="h-4 w-4" />
                <span className="sr-only">Bold</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={formatItalic}>
                <Italic className="h-4 w-4" />
                <span className="sr-only">Italic</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={formatLink}>
                <Link className="h-4 w-4" />
                <span className="sr-only">Link</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Link</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={formatQuote}>
                <Quote className="h-4 w-4" />
                <span className="sr-only">Quote</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Quote</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={formatBulletList}>
                <List className="h-4 w-4" />
                <span className="sr-only">Bullet List</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={formatNumberedList}>
                <ListOrdered className="h-4 w-4" />
                <span className="sr-only">Numbered List</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Numbered List</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onSelect={handleTextareaSelect}
        className="min-h-[300px] font-mono"
        placeholder="Write your content here using Markdown..."
      />
    </div>
  )
}

