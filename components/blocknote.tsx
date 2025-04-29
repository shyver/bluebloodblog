'use client';
import { useState, useEffect, useMemo, useImperativeHandle, forwardRef } from "react";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteSchema } from "@blocknote/core";
import { defaultBlockSpecs,defaultInlineContentSpecs,defaultStyleSpecs } from "@blocknote/core";

const BlockNote = forwardRef(({formSetValue}:any,ref)=> {
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
  
  const schema = useMemo(() => {
    // Create a custom schema without the 'to-do' block
    const customBlockSpecs = { ...defaultBlockSpecs };
    console.log(customBlockSpecs);
    
    if ("checkListItem" in customBlockSpecs) {
      delete (customBlockSpecs as any)["checkListItem"];

    }
    

    return BlockNoteSchema.create({
      blockSpecs: customBlockSpecs,
      inlineContentSpecs: defaultInlineContentSpecs,
      styleSpecs: defaultStyleSpecs,
    });
  }, []);

  // Creates a new editor instance
  const editor = useMemo(() => {
    if (initialContent === "loading" || typeof initialContent === "string") {
      return undefined; // Return undefined if the content is still loading or invalid
    }
    return BlockNoteEditor.create({ initialContent,schema });
  }, [initialContent, schema]);

  useEffect(() => {
    setIsClient(true);
  }, []);
  useImperativeHandle(ref, () => ({
    focus: () => {
      if (editor) {
        editor.focus(); // Focus the editor
      }
    },
  }));

  // Renders the editor instance using a React component
  return isClient && editor ? (

      <BlockNoteView
        editor={editor}
        theme={"light"}
        onChange={() => {
          setContent(editor.document);
          console.log(JSON.stringify(editor.document));
          
          formSetValue("content", JSON.stringify(editor.document)); // Update the form value with the editor content
        }}
        
      />
  ) : (
    <div>Loading...</div>
  );
}); 
BlockNote.displayName = "BlockNote";

export default BlockNote;