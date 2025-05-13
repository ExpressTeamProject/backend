import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { X } from "lucide-react";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
  maxTags?: number;
}

export function TagInput({
  value = [],
  onChange,
  placeholder = "태그 입력...",
  suggestions = [],
  maxTags = 10,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // 입력값에 따라 추천 태그 필터링
  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = suggestions.filter(
        (suggestion) => suggestion.toLowerCase().includes(inputValue.toLowerCase()) && !value.includes(suggestion)
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue, suggestions, value]);

  // 외부 클릭 시 추천 태그 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 태그 추가 함수
  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !value.includes(trimmedTag) && value.length < maxTags) {
      onChange([...value, trimmedTag]);
      setInputValue("");
    }
  };

  // 태그 삭제 함수
  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  // 키보드 이벤트 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      removeTag(value[value.length - 1]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 p-2 bg-white dark:bg-gray-950 border rounded-md focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500">
        {value.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="flex items-center gap-1 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 p-0.5"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">태그 삭제</span>
            </button>
          </Badge>
        ))}
        <div className="flex-1 relative">
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => inputValue.trim() && setShowSuggestions(filteredSuggestions.length > 0)}
            placeholder={value.length === 0 ? placeholder : ""}
            className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 h-8 p-0 placeholder:text-gray-400"
          />
          {showSuggestions && (
            <div
              ref={suggestionsRef}
              className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-900 shadow-lg rounded-md border dark:border-gray-700 max-h-60 overflow-auto"
            >
              {filteredSuggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  onClick={() => {
                    addTag(suggestion);
                    setShowSuggestions(false);
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {value.length >= maxTags && (
        <p className="text-sm text-red-500 mt-1">최대 {maxTags}개의 태그만 추가할 수 있습니다.</p>
      )}
    </div>
  );
}
