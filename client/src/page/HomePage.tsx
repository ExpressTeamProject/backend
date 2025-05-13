import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ProblemCard } from "../components/problem-card";
import { SearchBar } from "../components/search-bar";
import { CategoryFilter } from "../components/category-filter";
import { BookOpen, Plus, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { Layout } from "../components/layout";
import { useQuery } from "@tanstack/react-query";
import { useProblemsQuery } from "@/query/useProblemsQuery";
// 샘플 문제 데이터
const problemsSample = [
  {
    id: 1,
    title: "미분방정식의 일반해 구하기",
    category: "수학",
    author: "mathprofessor",
    date: "2023-04-28",
    likes: 24,
    comments: 8,
    solved: true,
  },
  {
    id: 2,
    title: "뉴턴의 운동법칙 적용 문제",
    category: "물리학",
    author: "physicslover",
    date: "2023-04-27",
    likes: 18,
    comments: 5,
    solved: false,
  },
  {
    id: 3,
    title: "알고리즘 복잡도 분석 문제",
    category: "컴퓨터공학",
    author: "codemaster",
    date: "2023-04-26",
    likes: 32,
    comments: 12,
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
    solved: false,
  },
];

// 인기 카테고리
const popularCategories = [
  { name: "수학", icon: "📊", color: "bg-blue-100 dark:bg-blue-900" },
  { name: "물리학", icon: "🔭", color: "bg-purple-100 dark:bg-purple-900" },
  { name: "컴퓨터공학", icon: "💻", color: "bg-green-100 dark:bg-green-900" },
  { name: "화학", icon: "🧪", color: "bg-yellow-100 dark:bg-yellow-900" },
  { name: "생물학", icon: "🧬", color: "bg-red-100 dark:bg-red-900" },
  { name: "전자공학", icon: "⚡", color: "bg-orange-100 dark:bg-orange-900" },
];

export default function HomePage() {
  const { data: problems, isSuccess } = useProblemsQuery();

  return (
    <Layout>
      <main className="flex-1">
        {/* 메인 섹션 */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-teal-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="container px-4 md:px-8 max-w-full mx-auto">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
                  전공 문제 공유 플랫폼
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl dark:text-gray-400">
                  다양한 전공 분야의 문제를 공유하고 함께 해결해보세요. 학습 커뮤니티와 함께 성장하세요.
                </p>
              </div>
              <div className="w-full max-w-md space-y-4">
                <SearchBar />
              </div>
              <Link to="/problems/new">
                <Button
                  size="lg"
                  className="mt-4 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Plus className="mr-2 h-4 w-4" /> 문제 등록하기
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-8 max-w-full mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">인기 카테고리</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularCategories.map((category) => (
                <Link to={`/category/${category.name}`} key={category.name}>
                  <div
                    className={`${category.color} rounded-xl p-4 text-center hover:shadow-md transition-all duration-300 h-full flex flex-col items-center justify-center`}
                  >
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <div className="font-medium">{category.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 카테고리 필터 및 인기 태그 */}
        <section className="container px-4 py-12 md:px-8 max-w-full mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/5 lg:w-1/6 space-y-6">
              <Card className="overflow-hidden border-none shadow-md dark:shadow-gray-800/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-teal-500" />
                    카테고리
                  </h3>
                  <CategoryFilter />
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-none shadow-md dark:shadow-gray-800/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-teal-500" />
                    인기 태그
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "미분방정식",
                      "알고리즘",
                      "양자역학",
                      "유기화학",
                      "데이터구조",
                      "열역학",
                      "선형대수",
                      "통계학",
                    ].map((tag) => (
                      <Link to={`/tag/${tag}`} key={tag}>
                        <div className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-3 py-1 rounded-full text-sm transition-colors">
                          #{tag}
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="md:w-4/5 lg:w-5/6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <Clock className="mr-2 h-6 w-6 text-teal-500" />
                  최근 등록된 문제
                </h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-full">
                    최신순
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    인기순
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    미해결
                  </Button>
                </div>
              </div>
              <div className="grid gap-4">
                {isSuccess && problems.data.map((problem) => <ProblemCard key={problem.id} problem={problem} />)}
              </div>
              <div className="flex justify-center mt-8">
                <Link to="/problems">
                  <Button variant="outline" className="rounded-full">
                    더 보기
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 커뮤니티 소개 */}
        <section className="py-16 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-8 text-center max-w-full mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">함께 성장하는 학습 커뮤니티</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 mb-8">
              전공 문제를 공유하고, 해결하고, 토론하며 함께 성장해보세요. 다양한 분야의 전문가들과 학생들이 모여 지식을
              나누는 공간입니다.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">문제 공유</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  어려운 문제를 공유하고 다양한 해결 방법을 배워보세요.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">문제 해결</h3>
                <p className="text-gray-600 dark:text-gray-400">다른 사용자의 문제를 해결하며 실력을 향상시키세요.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">지식 성장</h3>
                <p className="text-gray-600 dark:text-gray-400">다양한 분야의 지식을 쌓고 학문적 성장을 경험하세요.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
