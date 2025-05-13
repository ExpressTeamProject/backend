import { useState } from "react";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  icon: string;
}

const categories: Category[] = [
  { id: "math", name: "수학", icon: "📊" },
  { id: "physics", name: "물리학", icon: "🔭" },
  { id: "computer", name: "컴퓨터공학", icon: "💻" },
  { id: "chemistry", name: "화학", icon: "🧪" },
  { id: "biology", name: "생물학", icon: "🧬" },
  { id: "electronics", name: "전자공학", icon: "⚡" },
];

interface ProblemFilterProps {
  onFilterChange: (selectedCategories: string[]) => void;
}

export function ProblemFilter({ onFilterChange }: ProblemFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) => {
      const newSelection = prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId];

      onFilterChange(newSelection);
      return newSelection;
    });
  };

  return (
    <div className="w-full mb-6">
      <div className="text-lg font-semibold mb-3">카테고리 필터</div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => toggleCategory(category.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full transition-colors",
              "border border-gray-200 hover:border-emerald-500",
              selectedCategories.includes(category.id)
                ? "bg-emerald-500 text-white border-emerald-500"
                : "bg-white text-gray-700"
            )}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
