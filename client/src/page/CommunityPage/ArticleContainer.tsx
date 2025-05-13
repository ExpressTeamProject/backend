import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { Link } from "react-router";

function ArticleContainer({ posts }: { posts: any[] }) {
  return (
    <div className="flex-1">
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="question">질문</TabsTrigger>
          <TabsTrigger value="recruit">모집</TabsTrigger>
          <TabsTrigger value="info">정보</TabsTrigger>
          <TabsTrigger value="review">후기</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4">
            {posts.map((post) => (
              <CommunityPostCard key={post.id} post={post} categoryColors={categoryColors} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="question" className="mt-4">
          <div className="grid gap-4">
            {posts
              .filter((post) => post.category === "질문")
              .map((post) => (
                <CommunityPostCard key={post.id} post={post} categoryColors={categoryColors} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="recruit" className="mt-4">
          <div className="grid gap-4">
            {posts
              .filter((post) => post.category === "모집")
              .map((post) => (
                <CommunityPostCard key={post.id} post={post} categoryColors={categoryColors} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="info" className="mt-4">
          <div className="grid gap-4">
            {posts
              .filter((post) => post.category === "정보")
              .map((post) => (
                <CommunityPostCard key={post.id} post={post} categoryColors={categoryColors} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="review" className="mt-4">
          <div className="grid gap-4">
            {posts
              .filter((post) => post.category === "후기")
              .map((post) => (
                <CommunityPostCard key={post.id} post={post} categoryColors={categoryColors} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-8">
        <nav className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="rounded-full">
            <span className="sr-only">이전 페이지</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Button>
          <Button variant="outline" size="sm" className="rounded-full bg-primary text-primary-foreground">
            1
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            2
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            3
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <span className="sr-only">다음 페이지</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>
        </nav>
      </div>
    </div>
  );
}

// 커뮤니티 게시글 카드 컴포넌트
function CommunityPostCard({ post, categoryColors }: { post: any; categoryColors: Record<string, string> }) {
  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg dark:shadow-gray-800/30 transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.authorAvatar || "/placeholder.svg"} alt={post.author} />
              <AvatarFallback>{post.author.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <span className="font-medium">{post.author}</span>
              <p className="text-xs text-muted-foreground">{post.date}</p>
            </div>
          </div>
          <Badge className={categoryColors[post.category as keyof typeof categoryColors]}>{post.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <Link to={`/community/${post.id}`} className="hover:text-teal-500 transition-colors">
          <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
        </Link>
        <CardDescription className="line-clamp-2">{post.content}</CardDescription>
        <div className="flex flex-wrap gap-2 mt-3">
          {post.tags.map((tag: string) => (
            <Badge key={tag} variant="outline" className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex gap-4">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{post.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{post.comments}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

// 카테고리별 색상
const categoryColors = {
  질문: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  모집: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  정보: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  후기: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
};

export default ArticleContainer;
