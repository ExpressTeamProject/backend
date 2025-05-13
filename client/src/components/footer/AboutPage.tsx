import type React from "react";
import { motion } from "framer-motion";
import { Layout } from "../layout";
import { Card, CardContent } from "../ui/card";

const AboutPage: React.FC = () => {
  return (
    <Layout>
      {/* 히어로 섹션 */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">학문의 경계를 넘어, 함께 성장하는 공간</h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              다양한 전공 분야의 문제를 공유하고 함께 해결하는 학습 커뮤니티 플랫폼
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/problems"
                className="bg-white text-teal-700 px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all"
              >
                문제 탐색하기
              </a>
              <a
                href="/register"
                className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-all"
              >
                회원가입
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="border-teal-100 dark:border-teal-900/50 shadow-sm hover:shadow transition-shadow duration-300">
            <CardContent className="p-6" id="goals">
              <h2 className="text-2xl font-semibold mb-4 text-teal-800 dark:text-teal-300">우리의 목표</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                저희 학문공유 플랫폼의 핵심 목표는 지식의 성취를 실현하고, 학습의 여정을 보다 풍요롭고 협력적인 경험으로
                변화시키는 데 있습니다. 우리는 학생들이 배경이나 환경에 구애받지 않고 심도 있는 학습을 할 수 있도록 장벽
                없는 지식 공유 생태계를 구축하고자 합니다. 이를 위해 다양한 전공 분야의 학습자들이 서로의 질문에 답하고,
                해결 과정을 공유하며, 축적된 지식을 공동으로 활용할 수 있는 공간을 제공합니다. 단순히 정보를 전달하는
                것을 넘어, 비판적 사고 능력을 함양하고, 문제 해결 능력을 향상시키며, 궁극적으로 학문적 성장을 이루도록
                지원하는 커뮤니티를 지향합니다. 우리는 개방적이고 포용적인 환경을 조성하여 모든 학습자가 주체적으로
                참여하고, 서로에게 영감을 주며, 함께 성장하는 미래를 만들어 나갈 것입니다.
              </p>
            </CardContent>
          </Card>

          <Card className="border-teal-100 dark:border-teal-900/50 shadow-sm hover:shadow transition-shadow duration-300">
            <CardContent className="p-6" id="features">
              <h2 className="text-2xl font-semibold mb-4 text-teal-800 dark:text-teal-300">주요 기능</h2>
              <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 leading-relaxed mb-6 space-y-4">
                <li>
                  <strong className="text-teal-700 dark:text-teal-400">심층적인 문제 공유 및 상세 검색:</strong> 단순한
                  질문 등록을 넘어, 문제의 배경, 관련 개념, 시도했던 해결 방법 등을 상세하게 기록하고 공유할 수
                  있습니다. 또한, 키워드, 카테고리, 난이도, 태그 등 다양한 조건을 조합하여 원하는 문제를 정확하고 빠르게
                  검색할 수 있는 기능을 제공합니다.
                </li>
                <li>
                  <strong className="text-teal-700 dark:text-teal-400">실시간 협력 학습 환경:</strong> 등록된 문제에
                  대해 텍스트 기반의 댓글뿐만 아니라, 코드 스니펫 공유, 수식 입력, 이미지 첨부 등 다양한 방식으로
                  아이디어를 공유하고 토론할 수 있습니다. 실시간 편집 기능을 통해 여러 사용자가 함께 문제 해결 과정을
                  논의하고 공동의 이해를 도출할 수 있도록 지원할 예정입니다.
                </li>
                <li>
                  <strong className="text-teal-700 dark:text-teal-400">맞춤형 학습 지원 시스템:</strong> 사용자의 문제
                  해결 기록, 관심 분야, 학습 성과 등을 분석하여 개인에게 최적화된 학습 콘텐츠, 관련 문제 추천, 학습
                  로드맵 등을 제공하여 효율적인 학습을 지원합니다. 또한, 사용자의 수준에 맞는 멘토-멘티 연결 시스템을
                  구축하여 심도 있는 학습 지원을 제공할 계획입니다.
                </li>
                <li>
                  <strong className="text-teal-700 dark:text-teal-400">학습 커뮤니티 활성화 도구:</strong> 스터디 그룹
                  결성, 프로젝트 기반 학습, 온라인 세미나 개최 등 사용자들이 자율적으로 학습 커뮤니티를 조직하고 참여할
                  수 있는 다양한 도구를 제공합니다. 공동의 목표를 가진 학습자들이 서로 협력하고 지식을 공유하며 함께
                  성장할 수 있도록 적극적으로 지원할 것입니다.
                </li>
                <li>
                  <strong className="text-teal-700 dark:text-teal-400">지식 아카이브 구축 및 활용:</strong> 사용자들이
                  공유한 문제, 해결 방법, 학습 자료 등을 체계적으로 관리하고 검색할 수 있는 지식 아카이브를 구축합니다.
                  축적된 지식은 모든 사용자가 자유롭게 접근하고 활용할 수 있도록 개방하여 학습 효율성을 극대화하고 지식
                  공유 문화 확산에 기여할 것입니다.
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center">
            <p>최종 업데이트: 2025. 05. 01</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
