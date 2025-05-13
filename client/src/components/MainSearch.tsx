import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router";

export function MainSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/problems/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
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
    </div>
  );
}
