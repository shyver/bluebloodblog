"use client"

import { useEffect, useRef } from "react"
import type { Editor } from "@tiptap/react"
import {
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  CheckSquare,
  Code,
  ImageIcon,
  Quote,
  NotepadTextIcon as Paragraph,
} from "lucide-react"

interface BlockMenuProps {
  position: { x: number; y: number }
  editor: Editor
  onClose: () => void
}

export function BlockMenu({ position, editor, onClose }: BlockMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const menuItems = [
    {
      title: "Text",
      icon: <Paragraph className="w-4 h-4" />,
      action: () => {
        editor.chain().focus().setParagraph().run()
        onClose()
      },
    },
    {
      title: "Heading 1",
      icon: <Heading1 className="w-4 h-4" />,
      action: () => {
        editor.chain().focus().setHeading({ level: 1 }).run()
        onClose()
      },
    },
    {
      title: "Heading 2",
      icon: <Heading2 className="w-4 h-4" />,
      action: () => {
        editor.chain().focus().setHeading({ level: 2 }).run()
        onClose()
      },
    },
    {
      title: "Heading 3",
      icon: <Heading3 className="w-4 h-4" />,
      action: () => {
        editor.chain().focus().setHeading({ level: 3 }).run()
        onClose()
      },
    },
    {
      title: "Bullet List",
      icon: <List className="w-4 h-4" />,
      action: () => {
        editor.chain().focus().toggleBulletList().run()
        onClose()
      },
    },
    {
      title: "Numbered List",
      icon: <ListOrdered className="w-4 h-4" />,
      action: () => {
        editor.chain().focus().toggleOrderedList().run()
        onClose()
      },
    },
    {
      title: "Task List",
      icon: <CheckSquare className="w-4 h-4" />,
      action: () => {
        editor.chain().focus().toggleTaskList().run()
        onClose()
      },
    },
    {
      title: "Code Block",
      icon: <Code className="w-4 h-4" />,
      action: () => {
        editor.chain().focus().toggleCodeBlock().run()
        onClose()
      },
    },
    {
      title: "Quote",
      icon: <Quote className="w-4 h-4" />,
      action: () => {
        editor.chain().focus().toggleBlockquote().run()
        onClose()
      },
    },
    {
      title: "Image",
      icon: <ImageIcon className="w-4 h-4" />,
      action: () => {
        const url = window.prompt("Enter the URL of the image:")
        if (url) {
          editor.chain().focus().setImage({ src: url }).run()
        }
        onClose()
      },
    },
  ]

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-white rounded-md shadow-lg border overflow-hidden p-1"
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      <div className="grid grid-cols-1 gap-1 w-[220px] max-h-[400px] overflow-y-auto">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100"
          >
            <div className="flex items-center justify-center w-6 h-6">{item.icon}</div>
            <span>{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

