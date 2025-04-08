"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import type { Editor } from "@tiptap/react"
import { Plus } from "lucide-react"
import { BlockMenu } from "./block-menu"
interface EditorFloatingMenuProps {
  editor: Editor
}

export function EditorFloatingMenu({ editor }: EditorFloatingMenuProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [showBlockMenu, setShowBlockMenu] = useState(false)
  const [blockMenuPosition, setBlockMenuPosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  const updateMenu = useCallback(() => {
    if (!editor || !editor.view) return

    const { state } = editor.view
    const { selection } = state
    const { empty, $anchor } = selection

    // Only show when selection is empty (just a cursor)
    if (!empty) {
      setIsVisible(false)
      return
    }

    // Find the position between blocks
    const pos = $anchor.pos
    const resolvedPos = state.doc.resolve(pos)

    // Check if we're at the start of a block or between blocks
    const isAtBlockStart = resolvedPos.parentOffset === 0
    const isAtBlockEnd = resolvedPos.parentOffset === resolvedPos.parent.content.size

    if (!isAtBlockStart && !isAtBlockEnd) {
      setIsVisible(false)
      return
    }

    // Get the coordinates of the cursor
    const coords = editor.view.coordsAtPos(pos)

    setPosition({
      top: coords.top,
      left: coords.left - 30, // Offset to the left
    })

    setIsVisible(true)
  }, [editor])

  const handleAddBlock = useCallback((event: React.MouseEvent) => {
    event.preventDefault()

    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    setBlockMenuPosition({
      x: rect.left,
      y: rect.top,
    })
    setShowBlockMenu(true)
  }, [])

  const handleBlockMenuClose = useCallback(() => {
    setShowBlockMenu(false)
  }, [])

  useEffect(() => {
    if (!editor) return

    // Update on selection change
    const handleSelectionUpdate = () => {
      updateMenu()
    }

    editor.on("selectionUpdate", handleSelectionUpdate)

    // Also update when content changes
    editor.on("update", handleSelectionUpdate)

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate)
      editor.off("update", handleSelectionUpdate)
    }
  }, [editor, updateMenu])

  if (!isVisible || !editor) {
    return null
  }

  return (
    <>
      <div
        className="fixed z-40"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <button
          ref={buttonRef}
          onClick={handleAddBlock}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {showBlockMenu && <BlockMenu position={blockMenuPosition} editor={editor} onClose={handleBlockMenuClose} />}
    </>
  )
}

