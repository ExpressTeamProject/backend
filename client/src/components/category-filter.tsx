import { useState, useEffect } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { categories } from "@/constants/categories";

interface CategoryFilterProps {
  onCategoryChange?: (categories: string[]) => void;
  initialCategories?: string[];
}

export function CategoryFilter({ onCategoryChange, initialCategories = [] }: CategoryFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);

  const toggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newCategories);

    // 부모 컴포넌트에 변경 사항 알림
    if (onCategoryChange) {
      onCategoryChange(newCategories);
    }
  };

  // 초기 카테고리 설정 (최초 렌더링 시에만 실행)
  useEffect(() => {
    if (initialCategories && initialCategories.length > 0) {
      setSelectedCategories(initialCategories);
    }
  }, []); // 의존성 배열에서 initialCategories 제거

  return (
    <div className="space-y-3">
      {categories.map((category) => (
        <div key={category} className="flex items-center space-x-2 group">
          <Checkbox
            id={`category-${category}`}
            checked={selectedCategories.includes(category)}
            onCheckedChange={() => toggleCategory(category)}
            className="data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
          />
          <Label
            htmlFor={`category-${category}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer group-hover:text-teal-500 transition-colors"
          >
            {category}
          </Label>
        </div>
      ))}
    </div>
  );
}
