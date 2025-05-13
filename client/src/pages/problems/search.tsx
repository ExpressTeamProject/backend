import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { ProblemSearch } from "@/components/ProblemSearch";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q");

  const handleSearch = (query: string, categories: string[]) => {
    const newSearchParams = new URLSearchParams();
    if (query) newSearchParams.set("q", query);
    if (categories.length > 0) newSearchParams.set("categories", categories.join(","));
    setSearchParams(newSearchParams);

    // TODO: 여기에 실제 검색 로직 구현
    // 예: API 호출하여 검색 결과 가져오기
  };

  // 메인 페이지에서 넘어온 검색어가 있다면 검색 실행
  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery, []);
    }
  }, [initialQuery]);

  return (
    <div className="container mx-auto py-8">
      <ProblemSearch onSearch={handleSearch} />

      {/* TODO: 검색 결과 표시 영역 */}
      <div className="mt-8">{/* 검색 결과가 여기에 표시됩니다 */}</div>
    </div>
  );
}
