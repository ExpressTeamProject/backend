import { Link } from "react-router";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { Problem } from "@/query/useProblemsQuery";

interface ProblemCardProps {
  problem: Problem;
}

export function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <Link to={`/problems/${problem.id}`}>
      <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow duration-300 dark:shadow-gray-800/30">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge
                  variant="outline"
                  className={`${
                    problem.solved
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}
                >
                  {problem.solved ? "해결됨" : "미해결"}
                </Badge>
                <Badge variant="secondary" className="bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400">
                  {problem.categories.map((category) => category).join(", ")}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold mb-1 line-clamp-2">{problem.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>{problem.author.username}</span>
                <span className="mx-2">•</span>
                <span>{new Date(problem.createdAt).toLocaleDateString()}</span>
              </div>

              {/* 태그 표시 */}
              {problem.tags && problem.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {problem.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-gray-100 text-gray-800 text-xs dark:bg-gray-800 dark:text-gray-200"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center">
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{problem.likeCount}</span>
            </div>
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{problem.commentCount}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
