import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { Layout } from "../../components/layout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Search, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { ThumbsUp } from "lucide-react";
import TotalResultTabContent from "./TotalResultTabContent";
import ProblemResultTabContent from "./ProblemResultTabContent";

export default function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // 검색 결과 상태
  const [results, setResults] = useState({
    problems: [],
    posts: [],
    users: [],
    tags: [],
  });

  // 필터 상태
  const [filters, setFilters] = useState({
    category: "all",
    solved: "all",
    sortBy: "relevance",
  });

  // 검색 실행 함수
  const performSearch = (searchTerm) => {
    setIsLoading(true);

    // 실제 구현에서는 API 호출
    // 여기서는 샘플 데이터로 대체
    setTimeout(() => {
      // 문제 검색 결과
      const problemResults = [
        {
          id: 1,
          title: `미분방정식의 일반해 구하기 (검색어: ${searchTerm})`,
          category: "수학",
          author: "mathprofessor",
          date: "2023-04-28",
          likes: 24,
          comments: 8,
          solved: true,
        },
        {
          id: 2,
          title: `뉴턴의 운동법칙 적용 문제 (검색어: ${searchTerm})`,
          category: "물리학",
          author: "physicslover",
          date: "2023-04-27",
          likes: 18,
          comments: 5,
          solved: false,
        },
        {
          id: 3,
          title: `알고리즘 복잡도 분석 문제 (검색어: ${searchTerm})`,
          category: "컴퓨터공학",
          author: "codemaster",
          date: "2023-04-26",
          likes: 32,
          comments: 12,
          solved: true,
        },
      ];

      // 게시글 검색 결과
      const postResults = [
        {
          id: 1,
          title: `미분방정식 공부 방법 추천 (검색어: ${searchTerm})`,
          category: "질문",
          author: "mathstudent",
          date: "2023-05-02",
          likes: 8,
          comments: 12,
        },
        {
          id: 2,
          title: `물리학 스터디 그룹 모집 (검색어: ${searchTerm})`,
          category: "모집",
          author: "physicslover",
          date: "2023-05-01",
          likes: 15,
          comments: 7,
        },
      ];

      // 사용자 검색 결과
      const userResults = [
        {
          id: 1,
          username: `mathprofessor_${searchTerm}`,
          displayName: "수학 교수",
          avatar: "/musical-performance.png",
          major: "수학",
          problems: 24,
          solutions: 87,
        },
        {
          id: 2,
          username: `physicslover_${searchTerm}`,
          displayName: "물리학 애호가",
          avatar: "/abstract-geometric-shapes.png",
          major: "물리학",
          problems: 18,
          solutions: 42,
        },
      ];

      // 태그 검색 결과
      const tagResults = [
        { id: 1, name: `미분방정식_${searchTerm}`, count: 42 },
        { id: 2, name: `물리학_${searchTerm}`, count: 38 },
        { id: 3, name: `알고리즘_${searchTerm}`, count: 27 },
        { id: 4, name: `양자역학_${searchTerm}`, count: 19 },
        { id: 5, name: `선형대수_${searchTerm}`, count: 15 },
      ];

      setResults({
        problems: problemResults,
        posts: postResults,
        users: userResults,
        tags: tagResults,
      });
      setIsLoading(false);
    }, 500); // 0.5초 지연으로 로딩 상태 시뮬레이션
  };

  // 검색어 변경 시 검색 실행
  useEffect(() => {
    if (query) {
      performSearch(query);
    } else {
      setIsLoading(false);
    }
  }, [query]);

  // 검색 폼 제출 핸들러
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  // 필터 변경 핸들러
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Layout>
      <div className="container py-8 px-4 md:px-8 max-w-full mx-auto">
        <div className="flex flex-col gap-6">
          {/* 검색 폼 */}
          <div className="flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="검색어를 입력하세요..."
                  className="pl-10 py-6 rounded-full border-gray-300 dark:border-gray-700 focus-visible:ring-teal-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="rounded-full py-6 px-6 bg-teal-500 hover:bg-teal-600 transition-colors">
                검색
              </Button>
            </form>
          </div>

          {/* 검색 결과 헤더 */}
          {query && (
            <div>
              <h1 className="text-2xl font-bold mb-2">'{query}' 검색 결과</h1>
              <p className="text-muted-foreground">
                총 {results.problems.length + results.posts.length + results.users.length + results.tags.length}
                개의 결과를 찾았습니다
              </p>
            </div>
          )}

          {/* 로딩 상태 */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          )}

          {/* 검색 결과가 없는 경우 */}
          {!isLoading &&
            query &&
            !results.problems.length &&
            !results.posts.length &&
            !results.users.length &&
            !results.tags.length && (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <Search className="h-16 w-16 text-muted-foreground" />
                <h2 className="text-xl font-medium">검색 결과가 없습니다</h2>
                <p className="text-muted-foreground text-center max-w-md">
                  다른 검색어를 시도하거나 필터를 조정해보세요. 더 일반적인 용어를 사용하면 더 많은 결과를 찾을 수
                  있습니다.
                </p>
              </div>
            )}

          {/* 검색 결과 탭 */}
          {!isLoading &&
            query &&
            (results.problems.length > 0 ||
              results.posts.length > 0 ||
              results.users.length > 0 ||
              results.tags.length > 0) && (
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-5 mb-4">
                  <TabsTrigger value="all">
                    전체 ({results.problems.length + results.posts.length + results.users.length + results.tags.length})
                  </TabsTrigger>
                  <TabsTrigger value="problems">문제 ({results.problems.length})</TabsTrigger>
                  <TabsTrigger value="posts">게시글 ({results.posts.length})</TabsTrigger>
                  <TabsTrigger value="users">사용자 ({results.users.length})</TabsTrigger>
                  <TabsTrigger value="tags">태그 ({results.tags.length})</TabsTrigger>
                </TabsList>

                {/* 전체 결과 */}
                <TabsContent value="all" className="mt-0 space-y-6">
                  <TotalResultTabContent results={results} setActiveTab={setActiveTab} />
                </TabsContent>

                {/* 문제 결과 */}
                <TabsContent value="problems" className="mt-0">
                  <ProblemResultTabContent
                    results={results}
                    setActiveTab={setActiveTab}
                    handleFilterChange={handleFilterChange}
                    filters={filters}
                  />
                </TabsContent>

                {/* 게시글 결과 */}
                <TabsContent value="posts" className="mt-0">
                  <div className="grid gap-4">
                    {results.posts.map((post) => (
                      <Card
                        key={post.id}
                        className="overflow-hidden border-none shadow-md hover:shadow-lg dark:shadow-gray-800/30 transition-all duration-300"
                      >
                        <CardContent className="p-4">
                          <Link to={`/community/${post.id}`} className="hover:text-teal-500 transition-colors">
                            <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                          </Link>
                          <div className="flex justify-between items-center text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <Badge>{post.category}</Badge>
                              <span>작성자: {post.author}</span>
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
                </TabsContent>

                {/* 사용자 결과 */}
                <TabsContent value="users" className="mt-0">
                  <div className="grid gap-4">
                    {results.users.map((user) => (
                      <Card
                        key={user.id}
                        className="overflow-hidden border-none shadow-md hover:shadow-lg dark:shadow-gray-800/30 transition-all duration-300"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16 border-2 border-white dark:border-gray-800">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                              <AvatarFallback>{user.displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <Link
                                to={`/user/${user.username}`}
                                className="text-xl font-medium hover:text-teal-500 transition-colors"
                              >
                                {user.displayName}
                              </Link>
                              <p className="text-muted-foreground">@{user.username}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <Badge variant="outline">{user.major}</Badge>
                                <span className="text-muted-foreground">문제: {user.problems}</span>
                                <span className="text-muted-foreground">해결: {user.solutions}</span>
                              </div>
                            </div>
                            <Button className="bg-teal-500 hover:bg-teal-600 transition-colors">프로필 보기</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* 태그 결과 */}
                <TabsContent value="tags" className="mt-0">
                  <Card className="border-none shadow-md dark:shadow-gray-800/30">
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-3">
                        {results.tags.map((tag) => (
                          <Link to={`/tag/${tag.name}`} key={tag.id}>
                            <Badge
                              variant="secondary"
                              className="py-2 px-4 text-base bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 cursor-pointer"
                            >
                              #{tag.name} ({tag.count})
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
        </div>
      </div>
    </Layout>
  );
}
