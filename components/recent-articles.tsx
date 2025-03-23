import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, MessageSquare, ThumbsUp } from "lucide-react"

export function RecentArticles() {
  const articles = [
    {
      id: "1",
      title: "10 Tips for Better Writing",
      status: "published",
      views: 1234,
      likes: 89,
      comments: 23,
      date: "2023-04-23",
    },
    {
      id: "2",
      title: "The Future of Web Development",
      status: "published",
      views: 2345,
      likes: 120,
      comments: 45,
      date: "2023-04-22",
    },
    {
      id: "3",
      title: "Understanding JavaScript Promises",
      status: "draft",
      views: 0,
      likes: 0,
      comments: 0,
      date: "2023-04-21",
    },
    {
      id: "4",
      title: "CSS Grid Layout: A Complete Guide",
      status: "published",
      views: 3456,
      likes: 234,
      comments: 56,
      date: "2023-04-20",
    },
    {
      id: "5",
      title: "Getting Started with React Hooks",
      status: "published",
      views: 4567,
      likes: 345,
      comments: 67,
      date: "2023-04-19",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Articles</CardTitle>
        <CardDescription>Your most recent articles and their performance.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Likes</TableHead>
              <TableHead className="text-right">Comments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell>
                  <Badge variant={article.status === "published" ? "default" : "secondary"}>{article.status}</Badge>
                </TableCell>
                <TableCell>{article.date}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    {article.views}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                    {article.likes}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    {article.comments}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

