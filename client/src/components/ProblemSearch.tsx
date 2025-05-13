import { useState } from "react";
import { Search } from "lucide-react";
import { ProblemFilter } from "./ProblemFilter";

interface ProblemSearchProps {
  onSearch: (query: string, categories: string[]) => void;
}

export function ProblemSearch({ onSearch }: ProblemSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, selectedCategories);
  };

  const handleFilterChange = (categories: string[]) => {
    setSelectedCategories(categories);
    onSearch(searchQuery, categories);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        <span className="text-emerald-500">전공 문제</span> <span className="text-blue-500">공유 플랫폼</span>
      </h1>
      <p className="text-center text-gray-600 mb-8">
        다양한 전공 분야의 문제를 공유하고 함께 해결해보세요. 학습 커뮤니티와 함께 성장하세요.
      </p>

      <form onSubmit={handleSearch} className="relative mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="문제 검색..."
          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-emerald-500 text-white px-4 py-1.5 rounded-md hover:bg-emerald-600 transition-colors"
        >
          검색
        </button>
      </form>

      <ProblemFilter onFilterChange={handleFilterChange} />

      {selectedCategories.length > 0 && (
        <div className="text-sm text-gray-600 mb-4">선택된 카테고리: {selectedCategories.length}개</div>
      )}
    </div>
  );
}
