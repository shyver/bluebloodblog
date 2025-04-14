import {
    TiptapImage,
    TiptapLink,
    UpdatedImage,
    TaskList,
    TaskItem,
    HorizontalRule,
    StarterKit,
    Placeholder,
  } from "novel";
  
  import { cx } from "class-variance-authority";
  
  
  // You can overwrite the placeholder with your own configuration
  const placeholder = Placeholder.configure({
    placeholder: "Write something...",
    
  });
  const tiptapLink = TiptapLink.configure({
    HTMLAttributes: {
      class:
        "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
    
    },
  });
  
  const taskList = TaskList.configure({
    HTMLAttributes: {
      class: "not-prose pl-2 pr-4"
    },
  });
  const taskItem = TaskItem.configure({
    HTMLAttributes: {
      class: "flex items-start my-4"
    },
    nested: true,
  });
  
  const horizontalRule = HorizontalRule.configure({
    HTMLAttributes: {
      class: "mt-4 mb-6 border-t border-muted-foreground"
    },
  });
  
  const starterKit = StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
      HTMLAttributes: {
        class: 
          "font-title font-bold pl-4 my-2"
          
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc list-outside leading-3 flex flex-col gap-4 pl-10"
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal list-outside leading-3 flex flex-col gap-4 "
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "leading-normal -mb-2"
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: "border-l-4 border-primary"
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: "rounded-sm bg-muted border p-5 font-mono font-medium"
      },
    },
    code: {
      HTMLAttributes: {
        class: "rounded-md bg-muted  px-1.5 py-1 font-mono font-medium",
        spellcheck: "false",
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: "#DBEAFE",
      width: 4,
    },
    gapcursor: false,
  });
  
  export const defaultExtensions = [
    starterKit,
    placeholder,
    tiptapLink,
    TiptapImage,
    UpdatedImage,
    taskList,
    taskItem,
    horizontalRule,
  ];