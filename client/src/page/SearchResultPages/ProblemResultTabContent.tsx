import { ProblemCard } from "@/components/problem-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter } from "lucide-react";
import React from "react";

function ProblemResultTabContent({
  results,
  setActiveTab,
  handleFilterChange,
  filters,
}: {
  results: any;
  setActiveTab: (tab: string) => void;
  handleFilterChange: (key: string, value: string) => void;
  filters: any;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* 필터 사이드바 */}
      <div className="md:w-1/4 lg:w-1/5">
        <Card className="border-none shadow-md dark:shadow-gray-800/30 sticky top-20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              필터
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">카테고리</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="category-all"
                    name="category"
                    checked={filters.category === "all"}
                    onChange={() => handleFilterChange("category", "all")}
                    className="mr-2"
                  />
                  <label htmlFor="category-all">전체</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="category-math"
                    name="category"
                    checked={filters.category === "math"}
                    onChange={() => handleFilterChange("category", "math")}
                    className="mr-2"
                  />
                  <label htmlFor="category-math">수학</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="category-physics"
                    name="category"
                    checked={filters.category === "physics"}
                    onChange={() => handleFilterChange("category", "physics")}
                    className="mr-2"
                  />
                  <label htmlFor="category-physics">물리학</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="category-cs"
                    name="category"
                    checked={filters.category === "cs"}
                    onChange={() => handleFilterChange("category", "cs")}
                    className="mr-2"
                  />
                  <label htmlFor="category-cs">컴퓨터공학</label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">상태</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="solved-all"
                    name="solved"
                    checked={filters.solved === "all"}
                    onChange={() => handleFilterChange("solved", "all")}
                    className="mr-2"
                  />
                  <label htmlFor="solved-all">전체</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="solved-yes"
                    name="solved"
                    checked={filters.solved === "yes"}
                    onChange={() => handleFilterChange("solved", "yes")}
                    className="mr-2"
                  />
                  <label htmlFor="solved-yes">해결됨</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="solved-no"
                    name="solved"
                    checked={filters.solved === "no"}
                    onChange={() => handleFilterChange("solved", "no")}
                    className="mr-2"
                  />
                  <label htmlFor="solved-no">미해결</label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">정렬</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="sort-relevance"
                    name="sortBy"
                    checked={filters.sortBy === "relevance"}
                    onChange={() => handleFilterChange("sortBy", "relevance")}
                    className="mr-2"
                  />
                  <label htmlFor="sort-relevance">관련성</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="sort-latest"
                    name="sortBy"
                    checked={filters.sortBy === "latest"}
                    onChange={() => handleFilterChange("sortBy", "latest")}
                    className="mr-2"
                  />
                  <label htmlFor="sort-latest">최신순</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="sort-popular"
                    name="sortBy"
                    checked={filters.sortBy === "popular"}
                    onChange={() => handleFilterChange("sortBy", "popular")}
                    className="mr-2"
                  />
                  <label htmlFor="sort-popular">인기순</label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 문제 결과 목록 */}
      <div className="flex-1">
        <div className="grid gap-4">
          {results.problems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProblemResultTabContent;
