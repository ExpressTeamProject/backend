import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { Layout } from "../layout";

const PrivacyPolicyPage = () => {
  return (
    <Layout>
      <div className="container py-8 md:py-12 lg:py-16 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-teal-500 mr-3" />
            <h1 className="text-3xl font-bold tracking-tight text-center">개인정보처리방침</h1>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-center mb-2">
            학문공유 플랫폼은 회원의 개인정보를 소중히 여기며 관련 법규를 준수합니다.
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-500 text-center mb-10">최종 업데이트: 2025. 05. 01</p>

          <div className="space-y-6">
            <Card className="border-teal-100 dark:border-teal-900/50 shadow-sm" id="section1">
              <CardContent className="p-6">
                <div className="flex items-start mb-3">
                  <div className="bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-semibold px-3 py-1 rounded-md mr-3">
                    제 1조
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">총칙</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  학문공유는 회원의{" "}
                  <span className="font-medium text-teal-700 dark:text-teal-400">개인정보를 중요하게 생각</span>하며,
                  개인정보보호법 등 관련 법규를 준수하고 있습니다. 회사는 회원의 개인정보를 안전하게 관리하기 위하여
                  최선을 다하고 있으며, 본 개인정보처리방침을 통해 회원의 개인정보 수집, 이용, 제공, 관리 등에 대한
                  내용을 상세하게 안내해 드립니다.
                </p>
              </CardContent>
            </Card>

            <Card className="border-teal-100 dark:border-teal-900/50 shadow-sm" id="section2">
              <CardContent className="p-6">
                <div className="flex items-start mb-3">
                  <div className="bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-semibold px-3 py-1 rounded-md mr-3">
                    제 2조
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">수집하는 개인정보 항목</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  회사는 서비스 제공을 위해 다음과 같은 개인정보 항목을 수집할 수 있습니다.
                </p>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">필수 수집 항목:</span>{" "}
                      <span className="text-gray-700 dark:text-gray-300">[예: 아이디, 비밀번호, 이메일 주소]</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">선택 수집 항목:</span>{" "}
                      <span className="text-gray-700 dark:text-gray-300">[예: 닉네임, 전화번호, 프로필 정보]</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">자동 수집 항목:</span>{" "}
                      <span className="text-gray-700 dark:text-gray-300">[예: IP 주소, 쿠키, 서비스 이용 기록]</span>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-teal-100 dark:border-teal-900/50 shadow-sm" id="section3">
              <CardContent className="p-6">
                <div className="flex items-start mb-3">
                  <div className="bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-semibold px-3 py-1 rounded-md mr-3">
                    제 3조
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">개인정보의 이용 목적</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  회사는 수집한 개인정보를 다음의 목적을 위해 이용합니다.
                </p>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">회원 관리:</span>{" "}
                      <span className="text-gray-700 dark:text-gray-300">
                        회원 식별, 가입 및 탈퇴 처리, 공지사항 전달
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">서비스 제공:</span>{" "}
                      <span className="text-gray-700 dark:text-gray-300">
                        콘텐츠 제공, 맞춤형 서비스 제공, 문의사항 처리
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">서비스 개선:</span>{" "}
                      <span className="text-gray-700 dark:text-gray-300">
                        서비스 이용 분석, 기능 개선, 새로운 서비스 개발
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">마케팅 및 광고:</span>{" "}
                      <span className="text-gray-700 dark:text-gray-300">
                        이벤트 정보 제공, 광고성 정보 전달 (동의한 경우)
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">기타:</span>{" "}
                      <span className="text-gray-700 dark:text-gray-300">법률 준수 및 분쟁 처리</span>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 여기에 추가 조항들을 위한 카드 컴포넌트를 추가할 수 있습니다 */}
          </div>

          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center">
            <p>본 개인정보처리방침은 2025년 5월 1일부터 적용됩니다.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;
