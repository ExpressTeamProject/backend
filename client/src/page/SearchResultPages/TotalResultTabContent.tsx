import { ProblemCard } from "@/components/problem-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, MessageSquare, Tag, ThumbsUp, Users } from "lucide-react";
import { Link } from "react-router";

function TotalResultTabContent({ results, setActiveTab }: { results: any; setActiveTab: (tab: string) => void }) {
  return (
    <>
      {results.problems.length > 0 && (
        <Card className="border-none shadow-md dark:shadow-gray-800/30">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-teal-500" />
                문제
              </CardTitle>
              {results.problems.length > 3 && (
                <Button variant="link" size="sm" className="text-teal-500" onClick={() => setActiveTab("problems")}>
                  더 보기
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {results.problems.slice(0, 3).map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 게시글 결과 */}
      {results.posts.length > 0 && (
        <Card className="border-none shadow-md dark:shadow-gray-800/30">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-teal-500" />
                게시글
              </CardTitle>
              {results.posts.length > 3 && (
                <Button variant="link" size="sm" className="text-teal-500" onClick={() => setActiveTab("posts")}>
                  더 보기
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {results.posts.slice(0, 3).map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden border-none shadow-sm hover:shadow-md dark:shadow-gray-800/30 transition-all duration-300"
                >
                  <CardContent className="p-4">
                    <Link to={`/community/${post.id}`} className="hover:text-teal-500 transition-colors">
                      <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                    </Link>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <Badge>{post.category}</Badge>
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 사용자 결과 */}
      {results.users.length > 0 && (
        <Card className="border-none shadow-md dark:shadow-gray-800/30">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-teal-500" />
                사용자
              </CardTitle>
              {results.users.length > 3 && (
                <Button variant="link" size="sm" className="text-teal-500" onClick={() => setActiveTab("users")}>
                  더 보기
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {results.users.slice(0, 3).map((user) => (
                <Card
                  key={user.id}
                  className="overflow-hidden border-none shadow-sm hover:shadow-md dark:shadow-gray-800/30 transition-all duration-300"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-white dark:border-gray-800">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                        <AvatarFallback>{user.displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Link
                          to={`/user/${user.username}`}
                          className="font-medium hover:text-teal-500 transition-colors"
                        >
                          {user.displayName}
                        </Link>
                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm">
                          <Badge variant="outline">{user.major}</Badge>
                          <span className="text-muted-foreground">문제: {user.problems}</span>
                          <span className="text-muted-foreground">해결: {user.solutions}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 태그 결과 */}
      {results.tags.length > 0 && (
        <Card className="border-none shadow-md dark:shadow-gray-800/30">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-teal-500" />
                태그
              </CardTitle>
              {results.tags.length > 10 && (
                <Button variant="link" size="sm" className="text-teal-500" onClick={() => setActiveTab("tags")}>
                  더 보기
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {results.tags.slice(0, 10).map((tag) => (
                <Link to={`/tag/${tag.name}`} key={tag.id}>
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 cursor-pointer"
                  >
                    #{tag.name} ({tag.count})
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default TotalResultTabContent;
