import { ArticleEditor } from "@/components/article-editor"

export default function NewArticlePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Article</h1>
        <p className="text-muted-foreground">Write and publish a new blog article.</p>
      </div>
      <ArticleEditor />
    </div>
  )
}

