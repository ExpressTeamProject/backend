import { Link, useParams } from "react-router";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { ThumbsUp, MessageSquare, Share2, Bookmark, ArrowLeft } from "lucide-react";
import { CommentSection } from "../components/comment-section";
import { Layout } from "../components/layout";
import { MarkdownViewer } from "../components/markdown-viewer";
import { useProblemDetailQuery } from "@/query/useProblemDetailQuery";

export default function ProblemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: problemRes, isSuccess } = useProblemDetailQuery(id || "0");

  // TODO : 서버데이터 사용하게 수정
  if (!isSuccess) return <div>Loading...</div>;
  const problem = problemRes.data;

  return (
    <Layout>
      <main className="flex-1 container py-8 px-4 md:px-8 max-w-full mx-auto">
        <div className="flex flex-col gap-8 max-w-6xl mx-auto">
          <div className="flex items-center">
            <Link to="/problems" className="flex items-center text-gray-500 hover:text-teal-500 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              문제 목록으로 돌아가기
            </Link>
          </div>

          <Card className="border-none shadow-lg dark:shadow-gray-800/30 overflow-hidden">
            <CardHeader className="bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-800">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="outline" className="bg-white dark:bg-gray-800">
                  {problem.categories.map((category) => category).join(", ")}
                </Badge>
                {problem.tags?.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  >
                    {tag}
                  </Badge>
                ))}
                {problem.isSolved && (
                  <Badge className="ml-auto bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    해결됨
                  </Badge>
                )}
              </div>
              <CardTitle className="text-2xl">{problem.title}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Avatar className="h-8 w-8 border-2 border-white dark:border-gray-800">
                  <AvatarImage src={"/placeholder.svg"} alt={problem.author.username} />{" "}
                  {/* TODO: author에 아바타 이미지 넣기 */}
                  <AvatarFallback>{problem.author.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <span className="font-medium">{problem.author.username}</span>
                  <span className="text-gray-500 dark:text-gray-400"> • {problem.createdAt}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <MarkdownViewer content={problem.content} />
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4 bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>{problem.likeCount}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>댓글 ({problem.commentCount})</span>
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400"
                >
                  <Bookmark className="h-4 w-4" />
                  <span>저장</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400"
                >
                  <Share2 className="h-4 w-4" />
                  <span>공유</span>
                </Button>
              </div>
            </CardFooter>
          </Card>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-teal-500" />
              답변
            </h2>
            <CommentSection problemId={problem.id} />
          </div>
        </div>
      </main>
    </Layout>
  );
}
