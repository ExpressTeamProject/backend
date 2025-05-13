"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

import { Search, ChevronRight, HelpCircle } from "lucide-react";
import { Layout } from "../layout";

interface FAQCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface FAQItem {
  id: number;
  title: string;
  category: string;
}

const categories: FAQCategory[] = [
  { id: "all", name: "전체", icon: <HelpCircle className="w-5 h-5" /> },
  { id: "계정", name: "계정", icon: <HelpCircle className="w-5 h-5" /> },
  { id: "문제", name: "문제", icon: <HelpCircle className="w-5 h-5" /> },
  { id: "랭킹", name: "랭킹", icon: <HelpCircle className="w-5 h-5" /> },
  { id: "사용자 기능", name: "사용자 기능", icon: <HelpCircle className="w-5 h-5" /> },
];

const faqData: FAQItem[] = [
  { id: 1, title: "회원가입, 로그인이 안 됩니다. 어떻게 해야 하나요?", category: "계정" },
  { id: 2, title: "문제를 제출했는데 어디서 확인할 수 있나요?", category: "문제" },
  { id: 3, title: "랭킹은 어떻게 매겨지나요?", category: "랭킹" },
  { id: 4, title: "저장된 항목은 어디에서 보나요?", category: "사용자 기능" },
  { id: 5, title: "비밀번호를 잊어버렸어요. 어떻게 해야 하나요?", category: "계정" },
  { id: 6, title: "문제 풀이를 수정하고 싶어요. 가능한가요?", category: "문제" },
  { id: 7, title: "내 프로필을 어떻게 수정하나요?", category: "사용자 기능" },
  { id: 8, title: "다른 사용자와 어떻게 소통할 수 있나요?", category: "사용자 기능" },
];

const FAQPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 필터링된 FAQ 항목
  const filteredFAQs = faqData.filter(
    (faq) =>
      (activeCategory === "all" || faq.category === activeCategory) &&
      faq.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout hideFooter={false}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="container max-w-6xl py-8 md:py-12 lg:py-16 mx-auto px-4">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              자주 묻는 질문
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              학문공유 플랫폼 이용에 관한 자주 묻는 질문들을 모았습니다. 원하는 답변을 찾지 못하셨다면 문의하기를
              이용해주세요.
            </p>
          </div>

          {/* 검색 */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="질문 검색하기..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* 카테고리 탭 */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-teal-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>

          {/* FAQ 목록 */}
          <div className="grid gap-4">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-800 transition-all duration-200 hover:shadow-md cursor-pointer"
                  onClick={() => navigate(`/faq/${faq.id}`)}
                >
                  <div className="p-5 flex justify-between items-center">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 bg-teal-100 dark:bg-teal-900 rounded-full p-2">
                        <HelpCircle className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{faq.title}</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{faq.category}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">검색 결과가 없습니다</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  다른 검색어를 입력하거나 다른 카테고리를 선택해 보세요.
                </p>
              </div>
            )}
          </div>

          {/* 추가 도움 */}
          <div className="mt-12 text-center bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">원하는 답변을 찾지 못하셨나요?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              더 자세한 도움이 필요하시면 고객 지원팀에 문의해 주세요.
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-md transition-colors shadow-sm"
            >
              문의하기
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQPage;
