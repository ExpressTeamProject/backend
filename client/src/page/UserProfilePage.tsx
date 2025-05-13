import { Layout } from "../components/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { ProblemCard } from "../components/problem-card";
import { Link, useParams } from "react-router";
import {
  BookOpen,
  CheckCircle,
  MessageSquare,
  Award,
  Edit,
  Mail,
  Calendar,
  Bookmark,
  GraduationCap,
  ThumbsUp,
} from "lucide-react";

export default function UserProfilePage() {
  const { username } = useParams<{ username: string }>();

  return (
    <Layout>
      <div className="container py-8 px-4 md:px-8 max-w-full mx-auto">
        <div className="flex flex-col gap-8">
          {/* 프로필 헤더 */}
          <Card className="border-none shadow-lg dark:shadow-gray-800/30">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex flex-col items-center">
                  <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-800 shadow-md">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                    <AvatarFallback className="text-4xl">{user.displayName.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex gap-2 mt-4">
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 flex items-center gap-1">
                      <Award className="h-3 w-3" /> {user.badges.gold}
                    </Badge>
                    <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 flex items-center gap-1">
                      <Award className="h-3 w-3" /> {user.badges.silver}
                    </Badge>
                    <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 flex items-center gap-1">
                      <Award className="h-3 w-3" /> {user.badges.bronze}
                    </Badge>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div>
                      <h1 className="text-2xl font-bold">{user.displayName}</h1>
                      <p className="text-muted-foreground">@{user.username}</p>
                    </div>
                    {user.isCurrentUser ? (
                      <Link to={`/user/${user.username}/edit`}>
                        <Button className="mt-2 md:mt-0 bg-teal-500 hover:bg-teal-600 transition-colors">
                          <Edit className="mr-2 h-4 w-4" /> 프로필 편집
                        </Button>
                      </Link>
                    ) : (
                      <Button className="mt-2 md:mt-0 bg-teal-500 hover:bg-teal-600 transition-colors">
                        <Mail className="mr-2 h-4 w-4" /> 메시지 보내기
                      </Button>
                    )}
                  </div>
                  <p className="mb-4">{user.bio}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <GraduationCap className="h-4 w-4" />
                      <span>{user.major}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>가입일: {user.joinDate}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-none shadow-md dark:shadow-gray-800/30">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">등록한 문제</p>
                  <p className="text-3xl font-bold">{user.stats.problems}</p>
                </div>
                <BookOpen className="h-8 w-8 text-teal-500" />
              </CardContent>
            </Card>
            <Card className="border-none shadow-md dark:shadow-gray-800/30">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">해결한 문제</p>
                  <p className="text-3xl font-bold">{user.stats.solutions}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-teal-500" />
              </CardContent>
            </Card>
            <Card className="border-none shadow-md dark:shadow-gray-800/30">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">커뮤니티 게시글</p>
                  <p className="text-3xl font-bold">{user.stats.posts}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-teal-500" />
              </CardContent>
            </Card>
            <Card className="border-none shadow-md dark:shadow-gray-800/30">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">평판</p>
                  <p className="text-3xl font-bold">{user.stats.reputation}</p>
                </div>
                <Award className="h-8 w-8 text-teal-500" />
              </CardContent>
            </Card>
          </div>

          {/* 탭 콘텐츠 */}
          <Tabs defaultValue="problems" className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="problems">등록한 문제</TabsTrigger>
              <TabsTrigger value="solved">해결한 문제</TabsTrigger>
              <TabsTrigger value="posts">게시글</TabsTrigger>
              <TabsTrigger value="saved">저장한 항목</TabsTrigger>
              <TabsTrigger value="activity">활동 내역</TabsTrigger>
            </TabsList>
            <TabsContent value="problems" className="mt-0">
              <Card className="border-none shadow-md dark:shadow-gray-800/30">
                <CardHeader>
                  <CardTitle>등록한 문제</CardTitle>
                  <CardDescription>사용자가 등록한 문제 목록입니다</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {userProblems.length > 0 ? (
                      userProblems.map((problem) => <ProblemCard key={problem.id} problem={problem} />)
                    ) : (
                      <p className="text-center py-8 text-muted-foreground">등록한 문제가 없습니다</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="solved" className="mt-0">
              <Card className="border-none shadow-md dark:shadow-gray-800/30">
                <CardHeader>
                  <CardTitle>해결한 문제</CardTitle>
                  <CardDescription>사용자가 해결한 문제 목록입니다</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {solvedProblems.length > 0 ? (
                      solvedProblems.map((problem) => <ProblemCard key={problem.id} problem={problem} />)
                    ) : (
                      <p className="text-center py-8 text-muted-foreground">해결한 문제가 없습니다</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="posts" className="mt-0">
              <Card className="border-none shadow-md dark:shadow-gray-800/30">
                <CardHeader>
                  <CardTitle>커뮤니티 게시글</CardTitle>
                  <CardDescription>사용자가 작성한 커뮤니티 게시글입니다</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {userPosts.length > 0 ? (
                      userPosts.map((post) => (
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
                      ))
                    ) : (
                      <p className="text-center py-8 text-muted-foreground">작성한 게시글이 없습니다</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="saved" className="mt-0">
              <Card className="border-none shadow-md dark:shadow-gray-800/30">
                <CardHeader>
                  <CardTitle>저장한 항목</CardTitle>
                  <CardDescription>사용자가 저장한 문제와 게시글입니다</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-12 flex-col gap-2">
                    <Bookmark className="h-12 w-12 text-muted-foreground" />
                    <p className="text-muted-foreground">저장한 항목이 없습니다</p>
                    <p className="text-sm text-muted-foreground">
                      문제나 게시글의 저장 버튼을 클릭하여 저장할 수 있습니다
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="activity" className="mt-0">
              <Card className="border-none shadow-md dark:shadow-gray-800/30">
                <CardHeader>
                  <CardTitle>활동 내역</CardTitle>
                  <CardDescription>사용자의 최근 활동 내역입니다</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activityLog.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
                          {activity.type === "problem" && <BookOpen className="h-5 w-5 text-blue-500" />}
                          {activity.type === "solution" && <CheckCircle className="h-5 w-5 text-green-500" />}
                          {activity.type === "post" && <MessageSquare className="h-5 w-5 text-purple-500" />}
                          {activity.type === "comment" && <MessageSquare className="h-5 w-5 text-amber-500" />}
                          {activity.type === "badge" && <Award className="h-5 w-5 text-yellow-500" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                            <p className="font-medium">
                              {activity.action === "created" && "새 문제를 등록했습니다"}
                              {activity.action === "submitted" && "문제를 해결했습니다"}
                              {activity.action === "commented" && "댓글을 작성했습니다"}
                              {activity.action === "earned" && "배지를 획득했습니다"}
                            </p>
                            <span className="text-sm text-muted-foreground">{activity.date}</span>
                          </div>
                          <p className="text-sm mt-1">{activity.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}

// 실제 구현에서는 username을 사용하여 사용자 데이터를 가져옵니다
const user = {
  id: 1,
  username: "mathprofessor",
  displayName: "수학 교수",
  avatar: "/musical-performance.png",
  bio: "수학과 교수로 미분방정식과 선형대수학을 가르치고 있습니다. 학생들의 질문에 답변하고 도움을 주는 것을 좋아합니다.",
  major: "수학",
  joinDate: "2023-01-15",
  email: "math.professor@example.com",
  stats: {
    problems: 24,
    solutions: 87,
    posts: 35,
    reputation: 1850,
  },
  badges: {
    gold: 5,
    silver: 12,
    bronze: 24,
  },
  isCurrentUser: true,
};

// 사용자가 작성한 문제 샘플 데이터
const userProblems = [
  {
    id: 1,
    title: "미분방정식의 일반해 구하기",
    category: "수학",
    author: user.username,
    date: "2023-04-28",
    likes: 24,
    comments: 8,
    solved: true,
  },
  {
    id: 3,
    title: "선형대수학 고유값 문제",
    category: "수학",
    author: user.username,
    date: "2023-04-22",
    likes: 17,
    comments: 9,
    solved: true,
  },
];

// 사용자가 해결한 문제 샘플 데이터
const solvedProblems = [
  {
    id: 2,
    title: "뉴턴의 운동법칙 적용 문제",
    category: "물리학",
    author: "physicslover",
    date: "2023-04-27",
    likes: 18,
    comments: 5,
    solved: true,
  },
  {
    id: 4,
    title: "유기화학 반응 메커니즘 설명",
    category: "화학",
    author: "chemistrywhiz",
    date: "2023-04-25",
    likes: 15,
    comments: 3,
    solved: true,
  },
];

// 사용자가 작성한 커뮤니티 게시글 샘플 데이터
const userPosts = [
  {
    id: 1,
    title: "미분방정식 공부 방법 추천",
    category: "정보",
    date: "2023-05-02",
    likes: 32,
    comments: 14,
  },
  {
    id: 2,
    title: "수학과 대학원 진학 조언",
    category: "정보",
    date: "2023-04-15",
    likes: 28,
    comments: 21,
  },
];

// 활동 로그 샘플 데이터
const activityLog = [
  {
    id: 1,
    type: "problem",
    action: "created",
    title: "미분방정식의 일반해 구하기",
    date: "2023-04-28",
  },
  {
    id: 2,
    type: "solution",
    action: "submitted",
    title: "뉴턴의 운동법칙 적용 문제",
    date: "2023-04-27",
  },
  {
    id: 3,
    type: "post",
    action: "created",
    title: "미분방정식 공부 방법 추천",
    date: "2023-05-02",
  },
  {
    id: 4,
    type: "comment",
    action: "commented",
    title: "유기화학 반응 메커니즘 설명",
    date: "2023-04-26",
  },
  {
    id: 5,
    type: "badge",
    action: "earned",
    title: "해결사 골드 배지",
    date: "2023-04-25",
  },
];
