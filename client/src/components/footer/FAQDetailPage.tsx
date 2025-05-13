import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import { ArrowLeft, Clock, HelpCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Layout } from "../layout";

interface FAQItemWithContent {
  id: number;
  title: string;
  content: string;
  category?: string;
  updatedAt?: string;
}

const faqDataWithContent: FAQItemWithContent[] = [
  {
    id: 1,
    title: "회원가입, 로그인이 안 됩니다. 어떻게 해야 하나요?",
    category: "계정",
    updatedAt: "2025년 5월 2일",
    content: `회원가입 또는 로그인에 문제가 발생하는 경우, 다음 사항들을 확인해 주세요.

1. **입력 정보 확인:** 아이디, 비밀번호를 정확하게 입력했는지 대소문자를 포함하여 다시 한번 확인해 주세요.
2. **네트워크 연결 확인:** 인터넷 연결이 안정적인지 확인해 주세요.
3. **브라우저 캐시 및 쿠키 삭제:** 브라우저 설정에서 캐시 및 쿠키를 삭제한 후 다시 시도해 보세요.
4. **비밀번호 찾기:** 비밀번호를 잊으신 경우, '비밀번호 찾기' 기능을 이용하여 새로운 비밀번호를 설정해 주세요.
5. **고객 지원 문의:** 위 방법으로도 해결되지 않으면 고객 지원팀(help@example.com)으로 문의해 주시면 친절하게 안내해 드리겠습니다.`,
  },
  {
    id: 2,
    title: "문제를 제출했는데 어디서 확인할 수 있나요?",
    category: "문제",
    updatedAt: "2025년 4월 15일",
    content: `제출하신 문제는 '내 문제' 또는 '내가 푼 문제' 페이지에서 확인하실 수 있습니다. 해당 페이지에서 문제의 상태 (심사 중, 해결됨 등)와 다른 사용자의 풀이 등을 확인할 수 있습니다.`,
  },
  {
    id: 3,
    title: "랭킹은 어떻게 매겨지나요?",
    category: "랭킹",
    updatedAt: "2025년 3월 20일",
    content: `랭킹은 해결된 문제 수와 평판으로 채택된 기여도를 기준으로 매겨집니다. 활발하게 문제를 해결하고 다른 사용자들에게 도움이 되는 답변을 제공하여 평판을 쌓으면 랭킹이 올라갈 수 있습니다.`,
  },
  {
    id: 4,
    title: "저장된 항목은 어디에서 보나요?",
    category: "사용자 기능",
    updatedAt: "2025년 4월 28일",
    content: `저장된 문제는 프로필 페이지에서 확인할 수 있습니다. 상단 네비게이션 바의 프로필 아이콘을 클릭하면 '해결한 문제', '저장한 문제' 등의 탭을 통해 저장한 문제들을 모아볼 수 있습니다.`,
  },
  // ... 필요하다면 더 많은 질문과 답변 추가
];

const FAQDetailPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // URL 파싱하여 ID 추출
  const pathSegments = location.pathname.split("/");
  const idParam = pathSegments[pathSegments.length - 1];
  const id = parseInt(idParam);

  const faq = faqDataWithContent.find((item) => item.id === id);

  // 페이지 타이틀 설정
  useEffect(() => {
    if (faq) {
      document.title = `FAQ - ${faq.title} | 학문공유`;
    } else {
      document.title = "FAQ | 학문공유";
    }
  }, [faq]);

  const handleGoBack = () => {
    navigate("/faq");
  };

  if (!faq || isNaN(id)) {
    return (
      <Layout hideFooter={false}>
        <div className="container max-w-4xl py-8 md:py-12 lg:py-16 mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <HelpCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
            <h1 className="text-3xl font-bold tracking-tight mb-4">질문을 찾을 수 없습니다</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
              요청하신 FAQ 항목을 찾을 수 없습니다. 목록으로 돌아가서 다른 질문을 확인해보세요.
            </p>
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-md transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              FAQ 목록으로 돌아가기
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout hideFooter={false}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="container max-w-4xl py-8 md:py-12 lg:py-16 mx-auto px-4">
          {/* 상단 네비게이션 */}
          <div className="mb-8">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>FAQ 목록으로 돌아가기</span>
            </button>
          </div>

          {/* 카테고리 및 제목 */}
          <div className="mb-6">
            {faq.category && (
              <span className="inline-block bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs font-medium px-2.5 py-1 rounded-full mb-3">
                {faq.category}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{faq.title}</h1>
          </div>

          {/* 콘텐츠 카드 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-md">
            {/* 콘텐츠 헤더 */}
            <div className="border-b border-gray-100 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <h2 className="font-medium text-gray-700 dark:text-gray-300">답변</h2>
              {faq.updatedAt && (
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>최종 업데이트: {faq.updatedAt}</span>
                </div>
              )}
            </div>

            {/* 콘텐츠 본문 */}
            <div className="p-6 md:p-8">
              <div className="prose prose-teal dark:prose-invert max-w-none">
                <ReactMarkdown>{faq.content}</ReactMarkdown>
              </div>
            </div>
          </div>

          {/* 관련 질문 */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">관련 질문</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faqDataWithContent
                .filter((item) => item.id !== id && item.category === faq.category)
                .slice(0, 2)
                .map((relatedFaq) => (
                  <div
                    key={relatedFaq.id}
                    className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-100 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-800 transition-colors cursor-pointer"
                    onClick={() => navigate(`/faq/${relatedFaq.id}`)}
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white">{relatedFaq.title}</h4>
                  </div>
                ))}
            </div>
          </div>

          {/* 도움이 되었나요? */}
          <div className="mt-12 bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">이 답변이 도움이 되었나요?</h3>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md transition-colors">
                예
              </button>
              <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md transition-colors">
                아니오
              </button>
            </div>
          </div>

          {/* 추가 도움 */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              더 궁금한 점이 있으신가요?{" "}
              <a href="/contact" className="text-teal-500 hover:underline">
                문의하기
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQDetailPage;
