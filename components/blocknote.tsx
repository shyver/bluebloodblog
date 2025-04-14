'use client';
import { useState, useEffect, useMemo } from "react";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";

export default function BlockNote() {
  const [isClient, setIsClient] = useState(false);
  const [content, setContent] = useState<any>();
  const [initialContent, setInitialContent] = useState<PartialBlock[] | undefined | string>("loading");
  // Save content to localStorage whenever it changes
  useEffect(() => {
    if (content) {
      localStorage.setItem("editorContent", JSON.stringify(content));
    }
  }, [content]);

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      setInitialContent(JSON.parse(savedContent) as PartialBlock[]);
    } else {
      // Generate 8 empty paragraph blocks
      const emptyLines: PartialBlock[] = Array.from({ length: 8 }, () => ({
        type: "paragraph",
        props: {}, // Add default props if required by the schema
        content: [],
      }));
      setInitialContent(emptyLines);
    }
  }, []);

  // Creates a new editor instance
  const editor = useMemo(() => {
    if (initialContent === "loading") return undefined;
    return BlockNoteEditor.create({ initialContent });
  }, [initialContent]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Renders the editor instance using a React component
  return isClient && editor ? (
    <BlockNoteView
      editor={editor}
      theme={"light"}
      onChange={() => {
        setContent(editor.document);
        console.log(editor.document);
      }}
    />
  ) : (
    <div>Loading...</div>
  );
}