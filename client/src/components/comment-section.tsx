import type React from "react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardFooter } from "./ui/card";
import { ThumbsUp, MessageSquare, Flag, CornerDownRight } from "lucide-react";
import { MarkdownEditor } from "./markdown-editor";
import { MarkdownViewer } from "./markdown-viewer";
import { Comment } from "@/models/Comment";

interface CommentSectionProps {
  problemId: Comment["id"];
}

export function CommentSection({ problemId }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");

  // 샘플 댓글 데이터
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "mathexpert",
      authorAvatar: "/abstract-self-representation.png",
      content:
        "이 문제의 특성방정식 $r^2 + 4r + 4 = 0$은 $(r+2)^2 = 0$으로 중근 $r = -2$를 가집니다. 따라서 일반해는 $y = (C_1 + C_2x)e^{-2x}$ 입니다.",
      date: "2023-04-28",
      likes: 12,
      replies: [
        {
          id: 3,
          author: "newlearner",
          authorAvatar: "/copper-wires-closeup.png",
          content: "중근을 가질 때 왜 $y = (C_1 + C_2x)e^{-2x}$ 형태가 되는지 설명해주실 수 있나요?",
          date: "2023-04-29",
          likes: 3,
        },
        {
          id: 4,
          author: "mathexpert",
          authorAvatar: "/abstract-self-representation.png",
          content:
            "중근을 가질 때는 두 번째 선형 독립 해를 찾기 위해 $y = xe^{-2x}$ 형태의 해를 시도합니다. 이는 상미분방정식의 기본 이론에서 나오는데, 중근 $r$에 대해 $e^{rx}$와 $xe^{rx}$가 선형 독립 해가 됩니다.",
          date: "2023-04-29",
          likes: 8,
        },
      ],
    },
    {
      id: 2,
      author: "student123",
      authorAvatar: "/abstract-geometric-shapes.png",
      content: "감사합니다! 이제 이해가 됩니다. 중근을 가질 때 일반해의 형태가 달라진다는 것을 몰랐네요.",
      date: "2023-04-29",
      likes: 5,
    },
  ]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // 새 댓글 추가 (실제 구현에서는 API 호출)
    const newCommentObj: Comment = {
      id: Math.max(...comments.map((c) => c.id)) + 1,
      author: "currentUser", // 실제로는 로그인한 사용자 정보를 사용
      authorAvatar: "/copper-wires-closeup.png",
      content: newComment,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
    };

    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  const handleSubmitReply = (commentId: number) => {
    if (!replyContent.trim()) return;

    // 새 답글 추가 (실제 구현에서는 API 호출)
    const newReply: Comment = {
      id: Math.max(...comments.flatMap((c) => [c.id, ...(c.replies?.map((r) => r.id) || [])])) + 1,
      author: "currentUser", // 실제로는 로그인한 사용자 정보를 사용
      authorAvatar: "/copper-wires-closeup.png",
      content: replyContent,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
    };

    // 해당 댓글에 답글 추가
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply],
        };
      }
      return comment;
    });

    setComments(updatedComments);
    setReplyingTo(null);
    setReplyContent("");
  };

  const handleLike = (commentId: number, isReply = false, parentId?: number) => {
    if (!isReply) {
      // 댓글 좋아요
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.likes + 1,
          };
        }
        return comment;
      });
      setComments(updatedComments);
    } else if (parentId) {
      // 답글 좋아요
      const updatedComments = comments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies?.map((reply) => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  likes: reply.likes + 1,
                };
              }
              return reply;
            }),
          };
        }
        return comment;
      });
      setComments(updatedComments);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.authorAvatar || "/placeholder.svg"} alt={comment.author} />
                    <AvatarFallback>{comment.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{comment.date}</span>
                    </div>
                    <MarkdownViewer content={comment.content} className="text-sm" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-4 py-2 border-t flex justify-between">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleLike(comment.id)}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{comment.likes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>답글</span>
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <Flag className="h-4 w-4" />
                  <span>신고</span>
                </Button>
              </CardFooter>
            </Card>

            {/* 답글 목록 */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="ml-12 space-y-3">
                {comment.replies.map((reply) => (
                  <Card key={reply.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={reply.authorAvatar || "/placeholder.svg"} alt={reply.author} />
                          <AvatarFallback>{reply.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{reply.author}</span>
                            <span className="text-xs text-muted-foreground">{reply.date}</span>
                          </div>
                          <MarkdownViewer content={reply.content} className="text-sm" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="px-4 py-2 border-t flex justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleLike(reply.id, true, comment.id)}
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>{reply.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <Flag className="h-4 w-4" />
                        <span>신고</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            {/* 답글 작성 폼 */}
            {replyingTo === comment.id && (
              <div className="ml-12 mt-2">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CornerDownRight className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{comment.author}님에게 답글 작성</span>
                    </div>
                    <MarkdownEditor
                      value={replyContent}
                      onChange={setReplyContent}
                      placeholder="답글을 작성해주세요..."
                      height={150}
                      preview="edit"
                    />
                    <div className="flex justify-end gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyContent("");
                        }}
                      >
                        취소
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleSubmitReply(comment.id)}
                        disabled={!replyContent.trim()}
                        className="bg-teal-500 hover:bg-teal-600 transition-colors"
                      >
                        답글 등록
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmitComment} className="mt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">답변 작성</h3>
          <MarkdownEditor
            value={newComment}
            onChange={setNewComment}
            placeholder="답변을 작성해주세요..."
            height={200}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!newComment.trim()}
              className="bg-teal-500 hover:bg-teal-600 transition-colors"
            >
              답변 등록
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
