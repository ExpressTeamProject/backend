import { useState } from "react";
import { Layout } from "../layout";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, BookOpen, ChevronDown, ChevronUp, Info } from "lucide-react";

const HelpPage = () => {
  // FAQ 아코디언 상태 관리
  const [openFaqs, setOpenFaqs] = useState<number[]>([0]); // 첫 번째 FAQ는 기본적으로 열려있음

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  return (
    <Layout>
      <div className="container py-8 md:py-12 lg:py-16 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <HelpCircle className="w-8 h-8 text-teal-500 mr-3" />
            <h1 className="text-3xl font-bold tracking-tight text-center">도움말</h1>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-center mb-10">
            학문공유 플랫폼 이용에 관한 도움말과 자주 묻는 질문들을 확인하세요.
          </p>

          <section className="mb-10">
            <div className="flex items-center mb-6">
              <Info className="w-6 h-6 text-teal-500 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">자주 묻는 질문</h2>
            </div>

            <Card className="border-teal-100 dark:border-teal-900">
              <CardContent className="p-0">
                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                  {faqs.map((faq, index) => (
                    <div key={index} className="py-4 px-6">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="flex justify-between items-center w-full text-left font-semibold text-gray-800 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                      >
                        <span>{faq.question}</span>
                        {openFaqs.includes(index) ? (
                          <ChevronUp className="w-5 h-5 text-teal-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>

                      {openFaqs.includes(index) && (
                        <div className="mt-2 text-gray-700 dark:text-gray-300 leading-relaxed pl-1">{faq.answer}</div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-10">
            <div className="flex items-center mb-6">
              <BookOpen className="w-6 h-6 text-teal-500 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">사이트 이용 안내</h2>
            </div>

            <Card className="border-teal-100 dark:border-teal-900">
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {usageGuides.map((guide, index) => (
                    <li key={index} className="flex">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-500 mt-2.5 mr-3"></div>
                      <div>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{guide.title}:</span>{" "}
                        <span className="text-gray-700 dark:text-gray-300">{guide.content}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center">
            <p>최종 업데이트: 2025. 05. 01</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// FAQ 데이터
const faqs = [
  {
    question: "문제를 어떻게 제출하나요?",
    answer:
      "새로운 문제를 제출하려면 페이지 상단의 '문제 등록' 버튼을 클릭하세요. 문제 제목, 내용, 관련 카테고리 및 태그를 입력하고 제출하면 됩니다.",
  },
  {
    question: "다른 사용자의 풀이를 볼 수 있나요?",
    answer:
      "네, 문제 목록에서 다른 사용자들이 제출한 풀이를 확인할 수 있습니다. 마음에 드는 풀이에 좋아요를 누를 수도 있습니다.",
  },
  {
    question: "커뮤니티 기능은 무엇인가요?",
    answer:
      "커뮤니티 페이지에서는 다른 사용들과 자유롭게 소통하고 질문을 하거나 답변을 공유할 수 있습니다. 새로운 게시글을 작성하거나 기존 게시글에 댓글을 남길 수 있습니다.",
  },
  {
    question: "해결된 문제는 어떻게 활용하나요?",
    answer:
      "'해결된 문제' 페이지에서는 다른 사용자들이 이미 해결한 다양한 문제들을 살펴볼 수 있습니다. 검색 기능을 이용하거나, 관심 있는 분야별로 필터링하여 학습에 참고할 수 있습니다. 다른 사람들의 문제 해결 과정과 코드를 보면서 새로운 아이디어를 얻거나 어려움을 극복하는 데 도움을 받을 수 있습니다.",
  },
];

// 사이트 이용 안내 데이터
const usageGuides = [
  {
    title: "계정 생성",
    content:
      "사이트의 모든 기능을 이용하려면 계정을 생성해야 합니다. 상단의 '회원가입' 버튼을 클릭하여 계정을 만들 수 있습니다.",
  },
  {
    title: "문제 탐색",
    content: "다양한 카테고리와 필터를 사용하여 원하는 문제를 쉽게 찾을 수 있습니다.",
  },
  {
    title: "랭킹 시스템",
    content: "문제 해결 실력에 따라 랭킹이 업데이트됩니다. 다른 사용자들과 경쟁하며 실력을 향상시켜 보세요.",
  },
  {
    title: "프로필 관리",
    content:
      "프로필 페이지에서 자신의 정보와 해결한 문제 목록 등을 확인할 수 있으며, 프로필 편집 페이지에서 정보를 수정할 수 있습니다.",
  },
  {
    title: "해결된 문제 활용",
    content:
      "다른 사용자들이 해결한 문제들을 통해 학습하고, 문제 해결 능력을 향상시킬 수 있습니다. 검색 및 필터 기능을 활용하여 원하는 해결된 문제를 찾아보세요.",
  },
];
export default HelpPage;
