"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { Editor } from "@tiptap/react"
import { Bold, Italic, Underline, Strikethrough, Code, AlignLeft, AlignCenter, AlignRight, Link } from "lucide-react"

interface EditorBubbleMenuProps {
  editor: Editor
}

export function EditorBubbleMenu({ editor }: EditorBubbleMenuProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const menuRef = useRef<HTMLDivElement>(null)

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href
    const url = window.prompt("URL", previousUrl)

    if (url === null) return

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }, [editor])

  const updateMenu = useCallback(() => {
    if (!editor) return

    const selection = editor.view.state.selection
    if (selection.empty) {
      setIsVisible(false)
      return
    }

    // Only show for text selections
    if (editor.isActive("codeBlock")) {
      setIsVisible(false)
      return
    }

    const { from, to } = selection

    // Get the position of the selection
    const view = editor.view
    const { top, left, height } = view.coordsAtPos(from)
    const { right } = view.coordsAtPos(to)

    // Calculate the center position
    const centerX = left + (right - left) / 2

    if (menuRef.current) {
      const menuWidth = menuRef.current.offsetWidth
      const menuHeight = menuRef.current.offsetHeight

      setPosition({
        top: top - menuHeight - 10,
        left: centerX - menuWidth / 2,
      })
    } else {
      setPosition({
        top: top - 10,
        left: centerX,
      })
    }

    setIsVisible(true)
  }, [editor])

  useEffect(() => {
    if (!editor) return

    // Update on selection change
    const handleSelectionUpdate = () => {
      updateMenu()
    }

    editor.on("selectionUpdate", handleSelectionUpdate)
    editor.on("focus", handleSelectionUpdate)

    // Hide on blur
    editor.on("blur", () => {
      setIsVisible(false)
    })

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate)
      editor.off("focus", handleSelectionUpdate)
      editor.off("blur")
    }
  }, [editor, updateMenu])

  if (!isVisible || !editor) {
    return null
  }

  return (
    <div
      ref={menuRef}
      className="fixed z-50 flex items-center bg-white rounded-md shadow-lg border p-1 gap-1"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("bold") ? "bg-gray-100" : ""}`}
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("italic") ? "bg-gray-100" : ""}`}
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("underline") ? "bg-gray-100" : ""}`}
      >
        <Underline className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("strike") ? "bg-gray-100" : ""}`}
      >
        <Strikethrough className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("code") ? "bg-gray-100" : ""}`}
      >
        <Code className="w-4 h-4" />
      </button>
      <div className="w-px h-5 bg-gray-200 mx-1" />
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`p-1 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: "left" }) ? "bg-gray-100" : ""}`}
      >
        <AlignLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`p-1 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: "center" }) ? "bg-gray-100" : ""}`}
      >
        <AlignCenter className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`p-1 rounded hover:bg-gray-100 ${editor.isActive({ textAlign: "right" }) ? "bg-gray-100" : ""}`}
      >
        <AlignRight className="w-4 h-4" />
      </button>
      <div className="w-px h-5 bg-gray-200 mx-1" />
      <button
        onClick={setLink}
        className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("link") ? "bg-gray-100" : ""}`}
      >
        <Link className="w-4 h-4" />
      </button>
    </div>
  )
}

